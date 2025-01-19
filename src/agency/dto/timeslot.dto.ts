import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TimeslotDto {
  @ApiProperty({ description: 'Day of the week for the agency' })
  @IsString()
  @IsNotEmpty()
  day: string;

  @ApiProperty({ description: 'Start time of the agency’s availability' })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({ description: 'End time of the agency’s availability' })
  @IsString()
  @IsNotEmpty()
  to: string;
}
