import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entities/memo.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoEntity, UserEntity])],
  controllers: [MemoController],
  providers: [MemoService], // MemoService를 다른 모듈에서  사용할 수 있도록 내보냅니다.
})
export class MemoModule {}
