import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('11111');
    const user = await this.userService.findOneByUsernameAndHash(
      username,
      pass,
    );
    console.log('2222');
    if (user && bcrypt.compareSync(pass, user.hash)) {
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
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.userId };

    // 액세스 토큰 생성
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '60s', // 액세스 토큰의 유효 시간
    });

    // 리프레시 토큰 생성
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // 리프레시 토큰은 일반적으로 더 긴 유효 시간을 가집니다.
    });

    return { accessToken, refreshToken };
  }
}
