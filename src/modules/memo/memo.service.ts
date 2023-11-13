import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoEntity } from './entities/Memo.entity';
import { UserNotFoundException } from '../../common/exception/custom-exceptions/user-not-found.exception';
import { CreateMemoDto } from './dtos/create-memo.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateMemoDto } from './dtos/update-memo.dto';
import { MemoDto } from './dtos/memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoRepository: Repository<MemoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // 메모 생성
  async createMemo(createMemoDto: CreateMemoDto): Promise<MemoDto> {
    const { content, userId } = createMemoDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    const memo = this.memoRepository.create({
      content,
      user,
    });
    const memoEntity = await this.memoRepository.save(memo);
    return MemoDto.fromEntity(memoEntity);
  }

  // 모든 메모 조회
  async findAllMemos(): Promise<MemoDto[]> {
    const memoEntities = await this.memoRepository.find();
    return memoEntities.map((memoEntity) => MemoDto.fromEntity(memoEntity));
  }

  // 특정 메모 조회
  async findOneMemo(id: number): Promise<MemoDto> {
    const memoEntity = await this.memoRepository.findOneBy({ id });
    return MemoDto.fromEntity(memoEntity);
  }

  // 메모 업데이트
  async updateMemo(id: number, updateMemoDto: UpdateMemoDto): Promise<MemoDto> {
    await this.memoRepository.update(id, updateMemoDto);
    const memoEntity = await this.memoRepository.findOneBy({ id });
    return MemoDto.fromEntity(memoEntity);
  }

  // 메모 삭제
  async deleteMemo(id: number): Promise<void> {
    await this.memoRepository.delete(id);
  }
}
