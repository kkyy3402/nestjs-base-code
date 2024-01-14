import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload';

// Controller에서 @Request() req라는 파라미터를 만든 후, req.user.sub 이렇게 사용해도 되지만
// @Request에 대한 의존성이 발생하며, 유지보수성이 낮아지는 단점이 있는 것 같아,
// 요청한 user의 userId를 구할때는 해당 데코레이터를 통해 구한다.
export const UserIdFromJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload; // user 객체를 JwtPayload 타입으로 캐스팅

    return user.sub; // 'sub'는 사용자 ID를 나타냅니다.
  },
);
