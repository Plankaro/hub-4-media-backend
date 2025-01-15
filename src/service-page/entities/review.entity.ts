import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { User } from 'src/users/user.entity';

@Entity('service_review')
export class Review {
  @ApiProperty({ description: 'Unique identifier for the review.', example: 1 })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({
    description: 'ID of the service being reviewed.',
    example: 456,
  })
  @Column()
  serviceId: number;

  @ApiProperty({
    description: 'Rating provided by the user for the service.',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    type: 'number',
  })
  @Column('decimal', { precision: 2, scale: 1 }) // To ensure a 0-5 range with one decimal place
  rating: number;

  @ApiProperty({
    description: 'Detailed review provided by the user.',
    example: 'The service was excellent and the staff was friendly.',
  })
  @Column('text')
  review: string;

  @ApiProperty({ description: 'Date and time when the review was submitted.' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the review was last updated.',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Service, (service) => service.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @ApiProperty({ description: 'The service this review is associated with.' })
  service: Service;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn()
  @ApiProperty({ description: 'The user who submitted this review.' })
  user: User;
}
