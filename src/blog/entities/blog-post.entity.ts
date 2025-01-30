import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { BlogCategory } from './blog-category.entity';

import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/common/entities';
import { BlockNoteContent } from '../types/block-note.types';

@Entity()
export class BlogPost {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ type: [Object] })
  @Column('jsonb', { nullable: true })
  blocks?: BlockNoteContent[];

  @ApiProperty()
  @Column({ unique: true })
  slug: string;

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
