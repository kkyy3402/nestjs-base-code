import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserNotFoundException } from './custom-exceptions/user-not-found.exception';
import { ExceptionResponseDto } from '../dtos/common-exception-response.dto';
import { printLog } from '../utils/log-util';

@Catch()
export class CommonExceptionHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const exceptionResponse = this.createExceptionResponse(
      exception,
      request.url,
    );

    printLog(`exceptionResponse : ${JSON.stringify(exceptionResponse)}`);

    response.status(exceptionResponse.statusCode).json(exceptionResponse);
  }

  private createExceptionResponse(
    exception: unknown,
    path: string,
  ): ExceptionResponseDto {
    const exceptionResponse = new ExceptionResponseDto();
    exceptionResponse.timestamp = new Date().toISOString();
    exceptionResponse.path = path;

    if (exception instanceof UserNotFoundException) {
      exceptionResponse.statusCode = HttpStatus.NOT_FOUND;
      exceptionResponse.message = 'The user could not be found';
    } else if (exception instanceof HttpException) {
      exceptionResponse.statusCode = exception.getStatus();
      exceptionResponse.message = exception.getResponse();
    } else {
      exceptionResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      exceptionResponse.message = 'Unexpected error occurred';
    }

    return exceptionResponse;
  }
}
