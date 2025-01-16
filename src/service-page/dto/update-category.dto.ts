import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateServiceCategoryDto) { }
