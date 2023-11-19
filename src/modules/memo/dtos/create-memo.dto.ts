import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemoDto {
  @ApiProperty({
    example: '생성할 메모의 내용',
    description: '생성할 메모의 내용입니다.',
  })
  @IsNotEmpty()
  @IsString()
  contents: string;
}
