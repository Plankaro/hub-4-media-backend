import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ServiceFilterDto {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  categoryId?: string;
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  subCategoryId?: string;
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsArray()
  keyWords?: string[];
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minPrice?: number;
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPrice?: number;
}
