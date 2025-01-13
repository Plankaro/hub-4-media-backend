import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/common/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class HeroHeadings {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  firstHeading: string;

  @ApiProperty({ type: [String] })
  @Column('simple-array')
  secondHeading: string[];

  @ApiProperty()
  @Column()
  thirdHeading: string;

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.heroHeading, { cascade: true })
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
