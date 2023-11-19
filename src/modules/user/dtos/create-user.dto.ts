import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'myusername',
    description: '사용자의 아이디',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'yourpassword',
    description: '사용자의 비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
