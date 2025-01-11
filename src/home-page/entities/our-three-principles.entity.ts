import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OurThreePrinciples {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column()
  subHeading: string;

  @Column('json', { nullable: true })
  cards?: { icon?: string; heading: string; subheading: string }[];
}
