import { ApiProperty } from '@nestjs/swagger';
import { PaginationResultDto } from '../../common/dtos';
import { Agency } from '../entities';

export class AgencysListDto {
  @ApiProperty({ type: [Agency] })
  agencies: Agency[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
