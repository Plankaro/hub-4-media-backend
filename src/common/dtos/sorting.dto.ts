import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SortOrder } from '../types';
import { ValidateIfNonEmpty } from '../validators';

export class SortingDto {
  @ApiProperty({
    enum: SortOrder,
    enumName: 'SortOrder',
    example: 'ASC or DESC',
    required: false,
  })
  @IsEnum(SortOrder)
  @ValidateIfNonEmpty()
  order?: SortOrder;
}
