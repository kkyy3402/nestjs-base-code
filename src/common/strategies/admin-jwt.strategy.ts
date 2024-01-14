import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getIsTokenExpired } from '../utils/token-util';
import { roles } from '../constants';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Bearer 기준으로 검사
      // ignoreExpiration: false, //유효기간 검사
      ignoreExpiration: true,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    //토큰이 없는 경우
    if (!payload) {
      throw new UnauthorizedException();
    }

    //토큰이 만료된 경우
    const isTokenExpired = getIsTokenExpired(payload.exp);
    if (isTokenExpired) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    //토큰 안의 내용 확인
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Admin 역할 확인
    const isAdmin = user.roles.some((role) => role.roleName === roles.admin);
    if (!isAdmin) {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }

    return payload;
  }
}
