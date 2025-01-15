import { PartialType } from '@nestjs/mapped-types';
import { AboutOurCompanyDto } from './about-our-company.dto';

export class UpdateAboutOurCompanyDto extends PartialType(AboutOurCompanyDto) {}
