import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule], // UserModule을 imports 배열에 추가
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
