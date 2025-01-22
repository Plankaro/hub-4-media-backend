import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agency } from './agency.entity';
import { AgencySubCategory } from './sub-category';
import { ImageEntity } from 'src/common/entities';

@Entity()
export class AgencyCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.category)
  @JoinColumn()
  image: ImageEntity;

  @ApiProperty()
  @Column('boolean', { default: false })
  isFeatured: boolean;

  @ApiProperty()
  @Column('int', { nullable: true })
  priority: number;

  @ApiProperty({ type: () => [AgencySubCategory] })
  @OneToMany(() => AgencySubCategory, (subCategory) => subCategory.category)
  @JoinColumn()
  subCategories: AgencySubCategory[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ type: () => [Agency] })
  @OneToMany(() => Agency, (Agency) => Agency.category)
  agencies: Agency[];
}
