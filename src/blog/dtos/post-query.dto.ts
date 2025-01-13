import { PostFilterDto } from './post-filter.dto';
import { PaginationDto, SortingDto } from '../../common/dtos';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { IntersectionType } from '@nestjs/swagger';

export class PostQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto,
  SortingDto,
  PostFilterDto,
) {}

export class PostQueryDto extends IntersectionType(
  PostFilterDto,
  PaginationDto,
  SortingDto,
) {}
