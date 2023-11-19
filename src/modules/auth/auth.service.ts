import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { printLog } from '../../common/utils/log-util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsernameAndHash(username);

    printLog(`user : ${JSON.stringify(user)}`);
    printLog(`pass : ${pass}`);

    if (user && bcrypt.compareSync(pass, user.password)) {
      // const { hash, ...result } = user; // 'hash'를 제거합니다.
      const { ...result } = user; // 'hash'를 사용하지 않으므로 이렇게 변경합니다.
      return result;
    }
    return null;
  }

  async login(
    loginUserDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const payload = { username: user.username, sub: user.userId };

    printLog(`payload : ${JSON.stringify(payload)}`);

    // 액세스 토큰 생성
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '60s', // 액세스 토큰의 유효 시간,
      secret: process.env.JWT_SECRET,
    });

    // 리프레시 토큰 생성
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // 리프레시 토큰은 일반적으로 더 긴 유효 시간을 가집니다.
      secret: process.env.JWT_SECRET,
    });

    return LoginUserResponseDto.from(accessToken, refreshToken);
  }
}
