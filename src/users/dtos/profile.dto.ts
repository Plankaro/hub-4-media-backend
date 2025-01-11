import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class ProfileDto {
  @ApiProperty()
  user: User;
}
