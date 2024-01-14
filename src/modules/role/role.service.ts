import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { roleNames } from '../../common/constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {
    this.init();
  }

  async init() {
    // 초기화 역할 확인하고, 없으면 추가
    for (const roleName of roleNames) {
      const roleExists = await this.roleRepository.findOneBy({ roleName });

      if (!roleExists) {
        const role = new RoleEntity();
        role.roleName = roleName;
        await this.roleRepository.save(role);
      }
    }
  }
}
