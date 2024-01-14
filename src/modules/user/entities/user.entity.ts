import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemoEntity } from '../../memo/entities/memo.entity';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity('tb_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // 비밀번호의 해시

  @Column({ nullable: false, unique: true })
  email: string;

  @OneToMany(() => MemoEntity, (memo) => memo.user, { cascade: ['remove'] })
  memos: MemoEntity[];

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable()
  roles: RoleEntity[];
}
