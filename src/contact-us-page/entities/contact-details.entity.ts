import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/common/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
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

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.aboutUs)
  @JoinColumn()
  image: ImageEntity;

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
