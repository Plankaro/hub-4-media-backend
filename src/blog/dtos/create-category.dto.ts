import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Only alphabetical characters and white spaces are allowed.',
  })
  @Transform(({ value }) => (value as string).trim().toLowerCase())
  categoryName: string;

  @ApiProperty()
  @IsString()
  description?: string;
}
