import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MemoModule } from './modules/memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터베이스 타입
      host: 'localhost', // 호스트 (데이터베이스 서버 주소)
      port: 3306, // MySQL 포트
      username: 'root', // 데이터베이스 사용자 이름
      password: '1234', // 데이터베이스 비밀번호
      database: 'todo', // 데이터베이스 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 파일 위치
      synchronize: true, // 개발 환경에서만 사용하세요. 프로덕션에서는 false로 설정
    }),
    UserModule,
    MemoModule,
    AuthModule,
  ],
})
export class AppModule {}
