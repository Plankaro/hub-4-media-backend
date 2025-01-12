import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DaysOfWeek } from '../types/day.enum';

@Entity()
export class TimeSlot {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  fromTime: string;

  @ApiProperty()
  @Column()
  toTime: string;

  @ApiProperty({ enum: DaysOfWeek, enumName: 'Days in Week' })
  @Column('enum', { enum: DaysOfWeek })
  slots: DaysOfWeek;

  @ApiProperty({ type: Service })
  @ManyToOne(() => Service, (service) => service.timeSlots, {
    onDelete: 'CASCADE',
  })
  service: Service;
}
