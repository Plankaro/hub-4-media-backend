import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import { Social } from './social.entity';
import { Location } from './location.entity';
import { Timeslot } from './timeslot.entity';

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

  @OneToOne(() => Contact, { cascade: true })
  @JoinColumn()
  contact: Contact;

  @OneToOne(() => Social, { cascade: true })
  @JoinColumn()
  social: Social;

  @ApiProperty({ description: 'Timeslots of the agency' })
  @OneToMany(() => Timeslot, (timeslot) => timeslot.agency, { cascade: true })
  timeSlots: Timeslot[];

  @OneToOne(() => Location, { cascade: true })
  @JoinColumn()
  location: Location;

  @ApiProperty({ description: 'Agency description or tagline' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'URL to the agency’s logo or profile picture' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  pictureUrl: string;

  @ApiProperty({ description: 'Agency status (active or inactive)' })
  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;

  @ApiProperty({ description: 'Verified status of the agency' })
  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @ApiProperty({ description: 'The date the agency was featured' })
  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @ApiProperty({ description: 'The date the agency was created' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the agency details were last updated' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
