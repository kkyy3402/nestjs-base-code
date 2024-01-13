import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { UserIdFromJwt } from '../../common/decorators/user-id-from-jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dtos/user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { printLog } from '../../common/utils/log-util';

@ApiTags('인증')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: '로그인',
    description: '사용자 로그인을 처리합니다.',
  })
  async login(
    @Body() loginUserRequestDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    try {
      const { accessToken, refreshToken } =
        await this.authService.login(loginUserRequestDto);
      return { accessToken, refreshToken };
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh-token')
  @ApiOperation({
    summary: '토큰 리프레시',
    description: '토큰을 리프레시합니다.',
  })
  async refreshToken(
    @UserIdFromJwt() userId: number,
  ): Promise<LoginUserResponseDto> {
    try {
      const userDto = await this.userService.findById(userId);
      const { accessToken, refreshToken } =
        await this.authService.refreshToken(userDto);
      return { accessToken, refreshToken };
    } catch (e) {
      throw e;
    }
  }
}
