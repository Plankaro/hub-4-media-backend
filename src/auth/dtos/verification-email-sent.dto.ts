import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class VerificationEmailSentDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
