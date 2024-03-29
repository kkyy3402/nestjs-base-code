import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RoleEntity } from '../role/entities/role.entity';
import { AdminJwtStrategy } from '../../common/strategies/admin-jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), UserModule], // UserModule을 imports 배열에 추가
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserService,
    JwtStrategy,
    AdminJwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
