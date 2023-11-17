import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dtos/create-memo.dto';
import { UpdateMemoDto } from './dtos/update-memo.dto';
import { AuthGuard } from '@nestjs/passport';
import { printLog } from '../../common/utils/log-util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('메모') // 이 부분에서 API 그룹의 제목을 설정합니다.
@Controller('/api/v1/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createMemo(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.createMemo(createMemoDto);
  }

  @Get()
  async getAllMemos() {
    return this.memoService.findAllMemos();
  }

  @Get(':id')
  async getMemoById(@Param('id') id: number) {
    return this.memoService.findOneMemo(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateMemo(
    @Param('id') id: number,
    @Request() req,
    @Body() updateMemoDto: UpdateMemoDto,
  ) {
    const userId = req.user.userId;
    printLog(`userId : ${userId}`);
    return this.memoService.updateMemo(id, updateMemoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMemo(@Param('id') id: number) {
    await this.memoService.deleteMemo(id);
  }
}
