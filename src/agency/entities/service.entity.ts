import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Agency } from './agency.entity';

@Entity('agency_services')
export class AgencyServiceEntity {
  @ApiProperty({ description: 'Unique identifier of the service' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the service' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Description of the service' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Key features of the service' })
  @Column('simple-array')
  keyFeatures: string[];

  @ApiProperty({ description: 'Video URL of the service' })
  @Column({ type: 'varchar', length: 255 })
  videoUrl: string;

  @ManyToOne(() => Agency, (agency) => agency.services)
  agency: Agency;
}
