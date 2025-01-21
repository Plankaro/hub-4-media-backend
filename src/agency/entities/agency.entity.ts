import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import { Social } from './social.entity';
import { Location } from './location.entity';
import { Timeslot } from './timeslot.entity';
import { AgencyServiceEntity } from './service.entity';
import { ImageEntity } from 'src/common/entities';
import { AgencyCategory } from './category.entity';
import { AgencySubCategory } from './sub-category';

@Entity('agencies')
export class Agency {
  @ApiProperty({ description: 'Unique identifier of the agency' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the agency' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Slug used for the agency URL' })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @ApiProperty({ description: 'Agency website URL' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @ApiProperty({ type: () => Contact })
  @OneToOne(() => Contact, { cascade: true })
  @JoinColumn()
  contact: Contact;

  @ApiProperty({ type: () => Social })
  @OneToOne(() => Social, { cascade: true })
  @JoinColumn()
  social: Social;

  @ApiProperty({
    description: 'Timeslots of the agency',
    type: () => [Timeslot],
  })
  @OneToMany(() => Timeslot, (timeslot) => timeslot.agency, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  timeSlots: Timeslot[];

  @ApiProperty({ type: () => Location })
  @OneToOne(() => Location, { cascade: true })
  @JoinColumn()
  location: Location;

  @ApiProperty({ description: 'Services', type: () => [AgencyServiceEntity] })
  @OneToMany(
    () => AgencyServiceEntity,
    (agencyServiceEntity) => agencyServiceEntity.agency,
  )
  @JoinColumn()
  services: AgencyServiceEntity[];

  @ApiProperty({
    description: 'Available services of the agency',
    type: () => [String],
  })
  @Column({ type: 'simple-array' })
  availableServices: string[];

  @ApiProperty({
    description: 'Agency description or tagline',
    type: () => String,
  })
  @Column({ type: 'text' })
  description: string;

  // @ApiProperty({ description: 'URL to the agency’s logo or profile picture', type: () => String })
  // @Column({ type: 'varchar', length: 255, nullable: true })
  // pictureUrl: string;

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.agencyService, {
    cascade: true,
  })
  @JoinColumn()
  agencyLogo: ImageEntity;

  @ApiProperty({
    description: 'Agency status (active or inactive)',
    type: () => String,
  })
  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;

  @ApiProperty({ description: 'youtube video url' })
  @Column({ type: 'varchar', length: 255, default: 'ACTIVE' })
  videoUrl: string;

  @ApiProperty({ description: 'Verified status of the agency' })
  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @ApiProperty({ description: 'The date the agency was featured' })
  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Index()
  @ApiProperty({ type: () => AgencyCategory })
  @ManyToOne(() => AgencyCategory, (category) => category.agencies)
  @JoinColumn()
  category: AgencyCategory;

  @ApiProperty({ type: () => AgencySubCategory })
  @ManyToOne(() => AgencySubCategory, (subCategory) => subCategory.agencies)
  @JoinColumn()
  subCategory: AgencySubCategory;

  @ApiProperty({ description: 'The date the agency was created' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the agency details were last updated' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'The date the agency was deleted' })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
