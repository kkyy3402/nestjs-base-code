import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() loginUserRequestDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    const { accessToken, refreshToken } =
      await this.authService.login(loginUserRequestDto);
    return { accessToken, refreshToken };
  }
}
