import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';
import { ApiMessages } from '../constants';

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const handledRequest = next.handle();

    // Apply transformation to the Observable
    return handledRequest.pipe(
      map((data) => {
        const httpResponse = context.switchToHttp().getResponse();
        const statusCode = httpResponse.statusCode;
        const timestamp = new Date();

        return new ApiResponse(
          statusCode,
          ApiMessages.SUCCESS,
          data,
          timestamp,
        );
      }),
    );
  }
}
