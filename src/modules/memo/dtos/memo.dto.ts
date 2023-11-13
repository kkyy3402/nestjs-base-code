import { MemoEntity } from '../entities/Memo.entity';

export class MemoDto {
  id: number;
  content: string;
  userId: number; // 이 부분은 사용자 ID만 포함시키거나, 필요에 따라 생략할 수 있습니다.

  static fromEntity(memo: MemoEntity): MemoDto {
    const dto = new MemoDto();
    dto.id = memo.id;
    dto.content = memo.content;
    return dto;
  }
}
