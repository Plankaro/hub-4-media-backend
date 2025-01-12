import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ServiceFilterDto {
  @ApiProperty({
    description: 'Search by service title',
    example: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}