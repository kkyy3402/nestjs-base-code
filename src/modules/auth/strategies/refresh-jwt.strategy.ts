import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../common/dtos/jwt-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { printLog } from '../../../common/utils/log-util';
import { AuthService } from '../auth.service';
import { getIsTokenExpired } from '../../../common/utils/token-util';

const ACCESS_TOKEN_EXPIRE_LIMIT = 30 * 60; // 30분

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: JwtPayload) {
    // 1. 존재하는 유저인지 체크
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (getIsTokenExpired(payload.exp)) {
      throw new UnauthorizedException('Access token is about to expire');
    }

    return payload;
  }
}
