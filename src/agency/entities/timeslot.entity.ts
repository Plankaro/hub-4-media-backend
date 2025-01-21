import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Agency } from './agency.entity';

@Entity('timeslots')
export class Timeslot {
  @ApiProperty({ description: 'Unique identifier for the timeslot record' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Day of the week for the agency' })
  @Column({ type: 'varchar', length: 50 })
  day: string;

  @ApiProperty({ description: 'Start time of the agency’s availability' })
  @Column({ type: 'varchar', length: 50 })
  from: string;

  @ApiProperty({ description: 'End time of the agency’s availability' })
  @Column({ type: 'varchar', length: 50 })
  to: string;

  @ManyToOne(() => Agency, (agency) => agency.timeSlots, {cascade: true})
  agency: Agency;
}
