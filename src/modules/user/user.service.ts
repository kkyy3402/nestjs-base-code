import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '../role/entities/role.entity';
import { roles } from '../../common/constants';
import { PaginationParams } from '../../common/interfaces/pagenation-params';
import { applyPagination } from '../../common/utils/pagenation.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private rolesEntityRepository: Repository<RoleEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    // 이메일이 이미 존재하는지 확인
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    // 이미 존재하는 유저는 튕겨냄
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = this.userRepository.create(createUserDto);

    // 비번 등록
    newUser.password = await bcrypt.hash(newUser.password, 10);

    // 유저 역할 부여
    const userRole = await this.rolesEntityRepository.findOne({
      where: { roleName: roles.user },
    });

    if (!userRole) {
      throw new Error('User role not found');
    }

    newUser.roles = [userRole];

    const userEntity = await this.userRepository.save(newUser);

    return UserDto.fromEntity(userEntity);
  }

  async findAllUsers(pagination: PaginationParams): Promise<UserDto[]> {
    // 쿼리 빌더를 사용하여 페이징과 관련 조건을 적용
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.memos', 'memo');

    applyPagination(queryBuilder, pagination);

    const userEntities = await queryBuilder.getMany();
    return userEntities.map((userEntity) => UserDto.fromEntity(userEntity));
  }

  async findById(id: number): Promise<UserDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: id,
    });
    return UserDto.fromEntity(userEntity);
  }

  async updateUser(
    id: number,
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    await this.userRepository.update(id, updateUserDto);
    const userEntity = await this.userRepository.findOneBy({
      id: id,
    });
    return UserDto.fromEntity(userEntity);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneByEmailAndPassword(
    email: string,
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email });
  }
}
