import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class ContactDetails {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  phonNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  extraPhonNumber?: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  extraEmail?: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  googelMapLocation?: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  img: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  imgPublicID: string;

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
