import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('locations')
export class Location {
  @ApiProperty({ description: 'Unique identifier for the location record' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'City where the agency is located' })
  @Column({ type: 'varchar', length: 255 })
  city: string;

  @ApiProperty({ description: 'Country of the agency' })
  @Column({ type: 'varchar', length: 255 })
  country: string;

  @ApiProperty({ description: 'State of the agency' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @ApiProperty({ description: 'Agency Address Line 1' })
  @Column({ type: 'varchar', length: 255 })
  addressLine1: string;

  @ApiProperty({ description: 'Agency Address Line 2' })
  @Column({ type: 'varchar', length: 255 })
  addressLine2: string;

  @ApiProperty({ description: 'Agency Landmark gogle map embeded url' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  landmark: string;

  @ApiProperty({ description: 'Agency Postal Code' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  postalCode: string;
}
