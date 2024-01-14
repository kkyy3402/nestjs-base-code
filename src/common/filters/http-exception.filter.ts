import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response';
import { ApiMessages } from '../constants';

/**
 * 모든 HTTP 예외에 대해 표준화된 응답 형식을 제공하는 예외 필터.
 * 이 필터는 NestJS에서 발생하는 모든 HttpException 타입의 예외를 잡아서 처리합니다.
 * 예외가 발생하면, ApiResponse 형식에 맞춰 클라이언트에게 응답을 반환합니다.
 * 반환되는 응답에는 상태 코드, 에러 메시지, 그리고 null 데이터가 포함됩니다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorMessage =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || ApiMessages.UNKNOWN;
    const timestamp = new Date();
    response
      .status(status)
      .json(new ApiResponse(status, errorMessage, null, timestamp));
  }
}
