import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HeroHeadings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstHeading: string;

  @Column('simple-array')
  secondHeading: string[];

  @Column()
  thirdHeading: string;
}
