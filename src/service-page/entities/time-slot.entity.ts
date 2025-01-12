import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TimeSlotsOfDay } from './time-slots-of-day.entity';

@Entity()
export class TimeSlot {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  from: string;

  @ApiProperty()
  @Column()
  to: string;

  @ApiProperty()
  @Column({ nullable: true })
  slot: string;

  @ManyToOne(() => TimeSlotsOfDay, (day) => day.timeSlots)
  day: TimeSlotsOfDay;

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
