import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { roleNames } from '../../common/constants';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private roleRepository: Repository<RolesEntity>,
  ) {
    this.init();
  }

  async init() {
    // 초기화 역할 확인하고, 없으면 추가
    for (const roleName of roleNames) {
      const roleExists = await this.roleRepository.findOneBy({ roleName });

      if (!roleExists) {
        const role = new RolesEntity();
        role.roleName = roleName;
        await this.roleRepository.save(role);
      }
    }
  }
}
