import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/User.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['memos'] });
  }

  async findOneUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  getHello(): string {
    return 'HELLO WORLD !';
  }
}
