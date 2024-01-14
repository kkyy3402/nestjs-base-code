import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserIdFromJwt } from '../../common/decorators/user-id-from-jwt';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Pagination } from '../../common/decorators/pagenation';
import { PaginationParams } from '../../common/interfaces/pagenation-params';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';

@ApiTags('유저') // 이 부분에서 API 그룹의 제목을 설정합니다.
@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  async findAllUsers(@Pagination() pagination: PaginationParams) {
    return this.userService.findAllUsers(pagination);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: number,
    @UserIdFromJwt() userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
