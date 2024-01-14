import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoEntity } from './entities/memo.entity';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { CreateMemoDto } from './dtos/create-memo.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateMemoDto } from './dtos/update-memo.dto';
import { MemoDto } from './dtos/memo.dto';
import { ItemNotExistException } from '../../common/exceptions/item-not-exist-exception';
import { PaginationParams } from '../../common/interfaces/pagenation-params';
import { applyPagination } from '../../common/utils/pagenation.util';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoRepository: Repository<MemoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // 메모 생성
  async createMemo(
    userId: number,
    createMemoDto: CreateMemoDto,
  ): Promise<MemoDto> {
    const { contents } = createMemoDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    const memo = this.memoRepository.create({
      contents,
      user,
    });
    const memoEntity = await this.memoRepository.save(memo);
    return MemoDto.fromEntity(memoEntity);
  }

  // 모든 메모 조회
  async findAllMemos(pagination: PaginationParams): Promise<MemoDto[]> {
    const queryBuilder = this.memoRepository.createQueryBuilder('memo');
    applyPagination(queryBuilder, pagination);

    const memoEntities = await queryBuilder.getMany();
    return memoEntities.map((memoEntity) => MemoDto.fromEntity(memoEntity));
  }

  // 특정 메모 조회
  async findOneMemo(id: number): Promise<MemoDto> {
    const memoEntity = await this.memoRepository.findOneBy({ id });
    return MemoDto.fromEntity(memoEntity);
  }

  // 메모 업데이트
  async updateMemo(
    id: number,
    updateMemoDto: UpdateMemoDto,
    userId: number,
  ): Promise<MemoDto> {
    const item = await this.memoRepository.findOneBy({ id });

    // 메모가 존재하지 않는 경우, NotFoundException을 발생시킵니다.
    if (!item) {
      throw new ItemNotExistException();
    }

    // 본인이 아닌 경우
    if (item.user.id !== userId) {
      throw new ItemNotExistException();
    }

    await this.memoRepository.update(id, updateMemoDto);
    const memoEntity = await this.memoRepository.findOneBy({ id });
    return MemoDto.fromEntity(memoEntity);
  }

  // 메모 삭제
  async deleteMemo(id: number): Promise<void> {
    await this.memoRepository.delete(id);
  }
}
