import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/common/entities';

@Entity()
export class ExtraService {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column()
  duration: string;

  @ApiProperty({ type: () => [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.extraService)
  @JoinColumn()
  images: ImageEntity[];

  @ApiProperty({ type: () => Service })
  @ManyToOne(() => Service, (service) => service.extraServices, {
    onDelete: 'CASCADE',
  })
  service: Service;

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
