import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plans {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  plan: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  line: string;

  @ApiProperty()
  @Column()
  free: boolean;

  @ApiProperty()
  @Column()
  slogan: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'decimal' })
  amount?: number;

  @ApiProperty({ type: [String] })
  @Column('simple-array')
  services: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
