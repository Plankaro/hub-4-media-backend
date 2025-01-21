import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDto } from '../../common/dtos';
import { AgencyFilterDto } from './agency-filter.dto';

export class AgencyQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto,
  SortingDto,
  AgencyFilterDto,
) {}

export class AgencyQueryDto extends IntersectionType(
  AgencyFilterDto,
  PaginationDto,
  SortingDto,
) {}
