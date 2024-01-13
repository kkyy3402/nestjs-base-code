import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly name?: string;
  @IsNotEmpty()
  readonly email?: string;
}
