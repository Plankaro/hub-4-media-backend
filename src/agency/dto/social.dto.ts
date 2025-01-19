import { IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
  @ApiProperty({ description: 'Facebook link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @ApiProperty({ description: 'LinkedIn link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @ApiProperty({ description: 'YouTube link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  youtube?: string;

  @ApiProperty({ description: 'Twitter link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  twitter?: string;

  @ApiProperty({ description: 'Reddit link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  reddit?: string;

  @ApiProperty({ description: 'Instagram link of the agency', required: false })
  @IsOptional()
  @IsUrl()
  instagram?: string;
}
