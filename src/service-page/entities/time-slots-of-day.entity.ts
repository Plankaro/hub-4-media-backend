import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { TimeSlot } from './time-slot.entity';

@Entity()
export class TimeSlotsOfDay {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  day: string;

  @ApiProperty({ type: () => [TimeSlot] })
  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.day, { cascade: true })
  @JoinColumn()
  timeSlots: TimeSlot[];

  @ManyToOne(() => Service, (service) => service.availability)
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
