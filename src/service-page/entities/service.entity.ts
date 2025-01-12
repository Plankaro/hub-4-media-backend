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
import { TimeSlot } from './time-slot.entity';
import { ServiceCategory } from './category.entity';
import { ServiceSubCategory } from './sub-category';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { DaysOfWeek } from '../types/day.enum';
import { ImageEntity } from 'src/common/entities';

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
  @Column()
  duration: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ type: [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.service)
  images: ImageEntity[];

  @ApiProperty({ type: User })
  @ManyToOne(() => User, (user) => user.services)
  provider: User;

  @ApiProperty({ type: ServiceCategory })
  @ManyToOne(() => ServiceCategory, (category) => category.services)
  category: ServiceCategory;

  @ApiProperty({ type: ServiceSubCategory })
  @ManyToOne(() => ServiceSubCategory, (subCategory) => subCategory.services)
  subCategory: ServiceSubCategory;

  @ApiProperty({ type: [ExtraService] })
  @OneToMany(() => ExtraService, (extraService) => extraService.service, {
    cascade: true,
  })
  @JoinColumn()
  extraServices: ExtraService[];

  @ApiProperty({ type: [TimeSlot] })
  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.service, { cascade: true })
  @JoinColumn()
  timeSlots: TimeSlot[];

  @ApiProperty({ enum: DaysOfWeek, enumName: 'Days in Week' })
  @Column('enum', { enum: DaysOfWeek })
  day: DaysOfWeek;

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
  pincode: string;

  @ApiProperty()
  @Column()
  googleMapsPlaceID: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

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
