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
  intro: string;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  summary: string;

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.blog, { cascade: true })
  @JoinColumn()
  image: ImageEntity;

  @ApiProperty({ type: () => BlogCategory })
  @ManyToOne(() => BlogCategory, (category) => category.posts)
  category: BlogCategory;

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
