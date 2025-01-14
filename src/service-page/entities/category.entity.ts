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
import { Service } from './service.entity';
import { ImageEntity } from 'src/common/entities';
import { ServiceSubCategory } from './sub-category';

@Entity()
export class ServiceCategory {
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
  @Column('boolean')
  isFeatured: boolean;

  @ApiProperty()
  @Column('int', { nullable: true })
  priority: number;

  @ApiProperty({ type: () => [ServiceSubCategory] })
  @OneToMany(() => ServiceSubCategory, (subCategory) => subCategory.category)
  @JoinColumn()
  subCategories: ServiceSubCategory[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ type: () => [Service] })
  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
