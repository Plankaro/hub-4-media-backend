import { PartialType } from '@nestjs/mapped-types';
import { CreateWhyChooseUsDto } from './create-why-choose-us.dto';

export class UpdateWhyChooseUsDto extends PartialType(CreateWhyChooseUsDto) {}
