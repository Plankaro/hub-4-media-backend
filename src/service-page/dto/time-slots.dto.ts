import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DaysOfWeek } from '../types/day.enum';
import { Type } from 'class-transformer';

export class TimeSlotDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  slot?: string;
}

export class TimeSlotsOfDayDto {
  @ApiProperty({ enum: DaysOfWeek, enumName: 'DaysOfWeek' })
  @IsEnum(DaysOfWeek)
  day: DaysOfWeek;

  @ApiProperty({ type: () => [TimeSlotDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  timeSlots: TimeSlotDto[];
}
