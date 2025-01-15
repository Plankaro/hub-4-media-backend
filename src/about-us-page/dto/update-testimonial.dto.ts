import { ApiProperty } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class UpdateTestimonialDto extends CreateTestimonialDto {
  @ApiProperty({ type: ImageUploadDto, required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
