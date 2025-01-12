import { ApiProperty } from '@nestjs/swagger';
import { Service, ServiceCategory } from 'src/service-page/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class ImageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  imageName: string;

  @ApiProperty()
  @Column()
  imageUrl: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => ServiceCategory, (category) => category.image, {
    nullable: true,
    cascade: true,
  })
  category?: ServiceCategory;

  @ManyToOne(() => Service, (service) => service.images)
  service: Service;
}
