import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

import { ValidateIfNonEmpty } from '../../common/validators';

export class PostFilterDto {
  @ApiProperty({ required: false })
  @IsString()
  @ValidateIfNonEmpty()
  title?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @ValidateIfNonEmpty()
  categoryId?: string;
}
