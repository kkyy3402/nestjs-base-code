import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { printLog } from '../../common/utils/log-util';
import { JwtPayload } from '../../common/interfaces/jwt-payload';
import { UserDto } from '../user/dtos/user.dto';
import { TokenStatus } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDto> {
    const user = await this.userService.findOneByEmailAndPassword(email);

    printLog(`user : ${JSON.stringify(user)}`);
    printLog(`pass : ${password}`);

    if (user && bcrypt.compareSync(password, user.password)) {
      return UserDto.fromEntity(user);
    }
    return null;
  }

  private generateTokens(user: UserDto) {
    const jwtPayload: JwtPayload = {
      username: user.username,
      sub: user.id,
      roles: user.roles.map((role) => role.roleName),
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '1s',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<TokenStatus> {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      // 토큰이 정상적으로 검증되면 유효한 토큰임을 반환
      return TokenStatus.Valid;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // 토큰의 유효기간이 지난 경우
        return TokenStatus.Expired;
      } else {
        return TokenStatus.Invalid;
      }
    }
  }

  async login(
    loginUserDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    const user = await this.findOneByEmailAndPassword(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    return LoginUserResponseDto.from(accessToken, refreshToken);
  }

  async refreshToken(user: UserDto): Promise<LoginUserResponseDto> {
    const { accessToken, refreshToken } = this.generateTokens(user);
    return LoginUserResponseDto.from(accessToken, refreshToken);
  }
}
