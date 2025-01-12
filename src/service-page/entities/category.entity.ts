import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { ImageEntity } from 'src/common/entities';

@Entity()
export class ServiceCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.category)
  @JoinColumn()
  image: ImageEntity;

  @ApiProperty()
  @Column('boolean')
  isFeatured: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: [Service] })
  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
