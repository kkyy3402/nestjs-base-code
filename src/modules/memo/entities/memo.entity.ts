import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('tb_memos')
export class MemoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @ManyToOne(() => UserEntity, (user) => user.memos)
  user: UserEntity;
}
