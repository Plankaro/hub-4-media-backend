import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationAndShortDto {
  @ValidateIf((o) => !!o.perPage)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageNo: number;

  @ValidateIf((o) => !!o.pageNo)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  perPage: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orderBy: string;

  @IsOptional()
  @IsEnum(Order)
  @IsString()
  @IsNotEmpty()
  order: Order;
}
