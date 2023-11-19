import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MemoEntity } from '../../memo/entities/Memo.entity';

@Entity('tb_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // username이 고유해야 합니다.
  username: string;

  @Column()
  password: string; // 비밀번호의 해시

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => MemoEntity, (memo) => memo.user)
  memos: MemoEntity[];
}
