import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class CardsDto {
  @ApiProperty()
  icons: string;

  @ApiProperty()
  heading: string;

  @ApiProperty()
  subheading: string;
}

@Entity()
export class OurThreePrinciples {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  subHeading: string;

  @ApiProperty({ type: [CardsDto] })
  @Column('json', { nullable: true })
  cards?: { icon?: string; heading: string; subheading: string }[];

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
