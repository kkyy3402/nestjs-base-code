import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entities/Memo.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategies';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoEntity, UserEntity])],
  controllers: [MemoController],
  providers: [MemoService, JwtStrategy], // MemoService를 다른 모듈에서  사용할 수 있도록 내보냅니다.
})
export class MemoModule {}
