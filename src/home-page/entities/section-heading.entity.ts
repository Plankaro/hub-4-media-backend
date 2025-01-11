import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SectionName } from '../types/section-name.enum';

@Entity()
export class SectionHeadings {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: SectionName, enumName: 'SectionName' })
  @Column('enum', { enum: SectionName })
  sectionName: SectionName;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column({ nullable: true })
  subheading?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
