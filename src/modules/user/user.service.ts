import { Injectable } from '@nestjs/common';
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
    const newUser = this.userRepository.create(createUserDto);
    const hash = await bcrypt.hash(newUser.hash, 10);
    newUser.hash = hash;
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

  async findOneUser(id: number): Promise<UserDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: id,
    });
    return UserDto.fromEntity(userEntity);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userRepository.update(id, updateUserDto);
    const userEntity = await this.userRepository.findOneBy({
      id: id,
    });
    return UserDto.fromEntity(userEntity);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneByUsernameAndHash(
    username: string,
    hash: string,
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ username, hash });
  }
}
