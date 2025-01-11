import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HowItWorks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
