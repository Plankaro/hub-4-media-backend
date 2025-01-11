import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AboutOurCompany {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  descriptionOne: string;

  @ApiProperty()
  @Column({ nullable: true })
  descriptionTwo?: string;

  @ApiProperty()
  @Column()
  sideText: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  img: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  imgPublicID: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
