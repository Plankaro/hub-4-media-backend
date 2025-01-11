import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WhyChooseUs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column()
  subHeading: string;

  @Column('json', { nullable: true })
  cards?: { heading: string; description: string }[];

  @Column({ nullable: true, default: '' })
  img: string;

  @Column({ nullable: true, default: '' })
  imgPublicID: string;
}
