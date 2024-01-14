import { RolesEntity } from '../entities/roles.entity';

export class RoleDto {
  id: number;
  roleName: string;

  static fromEntity(rolesEntity: RolesEntity): RoleDto {
    const dto = new RoleDto();
    dto.id = rolesEntity.id;
    dto.roleName = rolesEntity.roleName;
    return dto;
  }
}
