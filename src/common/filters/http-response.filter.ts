import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dtos/api-response.dto';
import { ApiMessages } from '../constants';
import { printLog } from '../utils/log-util';

/**
 * 모든 성공적인 API 응답을 표준화된 형식으로 변환하는 인터셉터.
 * 이 인터셉터는 API 요청이 성공적으로 처리되었을 때 반환되는 데이터를
 * ApiResponse 형식으로 포장하여 반환합니다.
 * 각 응답에는 HTTP 상태 코드, 성공 메시지, 그리고 실제 데이터가 포함됩니다.
 * 이를 통해 API의 응답 형식을 일관되게 관리할 수 있습니다.
 */
@Injectable()
export class HttpResponseFilter<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    printLog('11231231312312312');

    return next
      .handle()
      .pipe(
        map(
          (data) =>
            new ApiResponse(
              context.switchToHttp().getResponse().statusCode,
              ApiMessages.SUCCESS,
              data,
            ),
        ),
      );
  }
}
