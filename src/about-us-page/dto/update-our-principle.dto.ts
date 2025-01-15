import { ImageUploadDto } from 'src/common/dtos';
import { CreateOurPrincipleDto } from './create-our-principle.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateOurPrincipleDto extends CreateOurPrincipleDto {
  @ApiProperty({ type: ImageUploadDto, required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
