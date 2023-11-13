import { MemoDto } from '../../memo/dtos/memo.dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  id?: number;
  username?: string;
  email?: string;
  memos?: MemoDto[]; // MemoDto는 MemoEntity에 해당하는 DTO

  static fromEntity(user: UserEntity): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.memos = user.memos?.map((memo) => MemoDto.fromEntity(memo));
    return dto;
  }
}
