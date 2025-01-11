import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class ResendVerificationEmailDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
