import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('tb_roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // username이 고유해야 합니다.
  roleName: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
