import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contacts')
export class Contact {
  @ApiProperty({ description: 'Email address of the agency' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Email address of the agency' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ description: 'Mobile number of the agency' })
  @Column({ type: 'varchar', length: 50 })
  mobileNo: string;
}
