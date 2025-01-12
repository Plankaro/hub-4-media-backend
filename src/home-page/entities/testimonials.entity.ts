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
export class Testimonials {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  profilePictureUrl: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  imagePublicId: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  rating: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  designation: string;

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
