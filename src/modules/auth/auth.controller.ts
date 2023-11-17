import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('인증') // 이 부분에서 API 그룹의 제목을 설정합니다.
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
