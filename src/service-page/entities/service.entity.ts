import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExtraService } from './extra-service.entity';
import { ServiceCategory } from './category.entity';
import { ServiceSubCategory } from './sub-category';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { ImageEntity } from 'src/common/entities';
import { TimeSlotsOfDay } from './time-slots-of-day.entity';

@Entity()
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  serviceTitle: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column({ nullable: true })
  currency?: string;

  @ApiProperty()
  @Column()
  duration: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  pincode: number;

  @ApiProperty()
  @Column()
  googleMapPlaceId: string;

  @ApiProperty()
  @Column()
  latitude: string;

  @ApiProperty()
  @Column()
  longitude: string;

  @ApiProperty({ type: () => [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.service)
  @JoinColumn()
  images: ImageEntity[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn()
  provider: User;

  @ApiProperty({ type: () => ServiceCategory })
  @ManyToOne(() => ServiceCategory, (category) => category.services)
  @JoinColumn()
  category: ServiceCategory;

  @ApiProperty({ type: () => ServiceSubCategory })
  @ManyToOne(() => ServiceSubCategory, (subCategory) => subCategory.services)
  @JoinColumn()
  subCategory: ServiceSubCategory;

  @ApiProperty({ type: () => [ExtraService] })
  @OneToMany(() => ExtraService, (extraService) => extraService.service, {
    cascade: true,
  })
  @JoinColumn()
  extraServices: ExtraService[];

  @ApiProperty({ type: () => [TimeSlotsOfDay] })
  @OneToMany(() => TimeSlotsOfDay, (timeSlot) => timeSlot.service, {
    cascade: true,
  })
  @JoinColumn()
  availability: TimeSlotsOfDay[];

  @ApiProperty({ required: false })
  @Column('text', { nullable: true })
  metaDescription?: string;

  @ApiProperty({ type: [String], required: false })
  @Column('json', { nullable: true })
  metaKeywords?: string[];

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  metaTitle?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  degree?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  institution?: string;

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
