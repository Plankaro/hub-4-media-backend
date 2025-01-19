import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('socials')
export class Social {
  @ApiProperty({ description: 'Unique identifier for the social media record' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Facebook page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  facebook: string;

  @ApiProperty({ description: 'LinkedIn page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  linkedin: string;

  @ApiProperty({ description: 'YouTube page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  youtube: string;

  @ApiProperty({ description: 'Twitter page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  twitter: string;

  @ApiProperty({ description: 'Reddit page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  reddit: string;

  @ApiProperty({ description: 'Instagram page URL of the agency' })
  @Column({ type: 'varchar', length: 255 })
  instagram: string;
}
