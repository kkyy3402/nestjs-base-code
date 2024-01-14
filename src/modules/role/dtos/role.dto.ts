import { RoleEntity } from '../entities/role.entity';

export class RoleDto {
  id: number;
  roleName: string;

  static fromEntity(rolesEntity: RoleEntity): RoleDto {
    const dto = new RoleDto();
    dto.id = rolesEntity.id;
    dto.roleName = rolesEntity.roleName;
    return dto;
  }
}
