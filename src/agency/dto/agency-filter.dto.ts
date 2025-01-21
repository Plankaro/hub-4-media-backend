import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class AgencyFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  subCategoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
