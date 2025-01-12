import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/common/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { WhyChooseUsCardsDto } from '../dto';

@Entity()
export class WhyChooseUs {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  heading: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: [WhyChooseUsCardsDto] })
  @Column('json')
  cards: WhyChooseUsCardsDto[];

  @ApiProperty({ type: () => ImageEntity })
  @OneToOne(() => ImageEntity, (image) => image.chooseUs)
  @JoinColumn()
  image: ImageEntity;

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
