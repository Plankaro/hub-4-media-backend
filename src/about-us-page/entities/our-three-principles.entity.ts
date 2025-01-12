import { ApiProperty } from '@nestjs/swagger';
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
import { ImageEntity } from 'src/common/entities';

@Entity()
export class OurThreePrinciples {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.principle)
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
