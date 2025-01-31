import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestSignInLinkDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
