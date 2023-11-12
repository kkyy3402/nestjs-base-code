import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/User.entity';
import { Repository } from 'typeorm';
import { MemoEntity } from './entities/Memo.entity';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoEntityRepository: Repository<MemoEntity>,
  ) {}
}
