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
  Index,
} from 'typeorm';
import { ExtraService } from './extra-service.entity';
import { ServiceCategory } from './category.entity';
import { ServiceSubCategory } from './sub-category';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { ImageEntity } from 'src/common/entities';
import { TimeSlotsOfDay } from './time-slots-of-day.entity';
import { ServicePricing } from './pricing.entity';
import { Review } from './review.entity';

@Entity()
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  serviceTitle: string;

  @ApiProperty()
  @OneToMany(() => ServicePricing, (pricing) => pricing.service, { cascade: true })
  @JoinColumn()
  pricings: ServicePricing[];

  // @ApiProperty()
  // @Column({ nullable: true })
  // currency?: string;

  // @ApiProperty()
  // @Column()
  // duration: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 255 })
  address?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 125 })
  country?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 125 })
  city?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 125 })
  state?: string;

  @ApiProperty()
  @Column({ nullable: true })
  pincode?: number;

  @ApiProperty()
  @Column("text", { array: true })
  includeServices: string[];

  // @ApiProperty()
  // @Column()
  // googleMapPlaceId: string;

  // @ApiProperty()
  // @Column()
  // latitude: string;

  // @ApiProperty()
  // @Column()
  // longitude: string;

  @ApiProperty()
  @Column()
  googleMapLink: string;

  @ApiProperty()
  @Column('text')
  videoUrl: string;

  @ApiProperty({ type: () => [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.service)
  @JoinColumn()
  images: ImageEntity[];

  @Index()
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn()
  provider: User;

  @Index()
  @ApiProperty({ type: () => ServiceCategory })
  @ManyToOne(() => ServiceCategory, (category) => category.services)
  @JoinColumn()
  category: ServiceCategory;

  @ApiProperty()
  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  overallRating?: number;

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

  @ApiProperty({ required: false })
  @OneToMany(() => Review, (review) => review.service, { cascade: true })
  @JoinColumn()
  reviews: Review[];

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
