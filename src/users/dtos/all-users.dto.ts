import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { PaginationResultDto } from '../../common/dtos';

export class UserWithCount extends User {
  @ApiProperty()
  careerChoiceCount: number;

  @ApiProperty()
  suggestionInstancesCount: number;

  @ApiProperty()
  feedbackCount: number;
}

export class AllUsersDto {
  @ApiProperty({ type: [UserWithCount] })
  users: UserWithCount[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
