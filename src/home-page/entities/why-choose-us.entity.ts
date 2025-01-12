import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class WhyChooseUs {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  subHeading: string;

  @ApiProperty()
  @Column('json', { nullable: true })
  cards?: { heading: string; description: string }[];

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

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
