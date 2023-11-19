import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dtos/create-memo.dto';
import { UpdateMemoDto } from './dtos/update-memo.dto';
import { AuthGuard } from '@nestjs/passport';
import { printLog } from '../../common/utils/log-util';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth-guard';
import { GetUserId } from '../auth/strategies/get-user-id';

@ApiTags('메모') // 이 부분에서 API 그룹의 제목을 설정합니다.
@Controller('/api/v1/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createMemo(
    @Body() createMemoDto: CreateMemoDto,
    @GetUserId() userId: number,
  ) {
    return this.memoService.createMemo(userId, createMemoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMemos() {
    return this.memoService.findAllMemos();
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
    @GetUserId() userId: number,
    @Body() updateMemoDto: UpdateMemoDto,
  ) {
    printLog(`userId : ${userId}`);
    return this.memoService.updateMemo(id, updateMemoDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMemo(@Param('id') id: number, @GetUserId() userId: number) {
    await this.memoService.deleteMemo(id);
  }
}
