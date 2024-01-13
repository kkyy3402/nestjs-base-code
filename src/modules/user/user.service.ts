import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { printLog } from '../../common/utils/log-util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    // 이메일이 이미 존재하는지 확인
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      // 이미 존재하는 경우, BadRequestException을 던짐
      throw new BadRequestException('Email already exists');
    }

    // 이메일이 존재하지 않는 경우, 사용자 생성 및 저장
    const newUser = this.userRepository.create(createUserDto);
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    const userEntity = await this.userRepository.save(newUser);

    printLog(`userEntity : ${JSON.stringify(userEntity)}`);
    return UserDto.fromEntity(userEntity);
  }

  async findAllUsers(): Promise<UserDto[]> {
    const userEntities = await this.userRepository.find({
      relations: ['memos'],
    });
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
