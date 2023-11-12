import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MemoEntity } from '../../memo/entities/Memo.entity';

@Entity('tb_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => MemoEntity, (memo) => memo.user)
  memos: MemoEntity[];
}
