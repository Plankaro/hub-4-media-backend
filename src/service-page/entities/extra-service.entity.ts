import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ExtraService {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  additionalService: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column()
  duration: string;

  @ApiProperty()
  @ManyToOne(() => Service, (service) => service.extraServices, {
    onDelete: 'CASCADE',
  })
  service: Service;
}
