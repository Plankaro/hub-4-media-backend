import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Plans {
  @ApiProperty({
    description: 'Unique identifier for the plan.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the plan.',
    example: 'Basic',
    type: 'string',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Price amount for the service.',
    example: 99.99,
    type: 'number',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Description of the plan.',
    example: 'This is the basic plan',
    type: 'string',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Features of the plan.',
    type: 'array',
    example: [
      { text: 'Feature 1', included: true },
      { text: 'Feature 2', included: false },
    ],
  })
  @Column({ type: 'jsonb' })
  features: Array<{ text: string; included: boolean }>;

  @ApiProperty({ description: 'Is this plan popular?', example: false })
  @Column({ type: 'boolean', default: false })
  isPopular: boolean;

  @ApiProperty({ description: 'The creation timestamp of the plan' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update timestamp of the plan' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
