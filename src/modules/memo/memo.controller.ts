import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dtos/create-memo.dto';
import { UpdateMemoDto } from './dtos/update-memo.dto';
import { printLog } from '../../common/utils/log.util';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserIdFromJwt } from '../../common/decorators/user-id-from-jwt';
import { Pagination } from '../../common/decorators/pagination';
import { PaginationParams } from '../../common/interfaces/pagination-params';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';

@ApiTags('메모') // 이 부분에서 API 그룹의 제목을 설정합니다.
@Controller('/api/v1/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMemo(
    @Body() createMemoDto: CreateMemoDto,
    @UserIdFromJwt() userId: number,
  ) {
    return this.memoService.createMemo(userId, createMemoDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  async getAllMemos(@Pagination() pagination: PaginationParams) {
    return this.memoService.findAllMemos(pagination);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMemoById(@Param('id') id: number) {
    return this.memoService.findOneMemo(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateMemo(
    @Param('id') id: number,
    @UserIdFromJwt() userId: number,
    @Body() updateMemoDto: UpdateMemoDto,
  ) {
    printLog(`userId : ${userId}`);
    return this.memoService.updateMemo(id, updateMemoDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMemo(@Param('id') id: number, @UserIdFromJwt() userId: number) {
    await this.memoService.deleteMemo(id);
  }
}
