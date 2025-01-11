import { ApiProperty } from '@nestjs/swagger';

export class OfferHeadingsDto {
  @ApiProperty()
  heading: string;

  @ApiProperty()
  subheading: string;

  @ApiProperty()
  description: string;
}
