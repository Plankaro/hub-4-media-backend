import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agency } from './agency.entity';
import { Exclude } from 'class-transformer';
import { AgencyCategory } from './category.entity';

@Entity()
export class AgencySubCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ type: () => AgencyCategory })
  @ManyToOne(() => AgencyCategory, (category) => category.subCategories)
  @JoinColumn()
  category: AgencyCategory;

  @Exclude()
  @OneToMany(() => Agency, (Agency) => Agency.subCategory)
  agencies: Agency[];
}
