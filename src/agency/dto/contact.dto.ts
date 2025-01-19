import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ description: 'Email address of the agency contact' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mobile phone number of the agency contact' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;
}
