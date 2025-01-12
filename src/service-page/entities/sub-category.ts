import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { Exclude } from 'class-transformer';
import { ServiceCategory } from './category.entity';

@Entity()
export class ServiceSubCategory {
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

  @ApiProperty({ type: () => ServiceCategory })
  @ManyToOne(() => ServiceCategory, (category) => category.subCategories)
  category: ServiceCategory;

  @Exclude()
  @OneToMany(() => Service, (service) => service.subCategory)
  services: Service[];
}
