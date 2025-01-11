import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plan: string;

  @Column()
  heading: string;

  @Column()
  line: string;

  @Column()
  free: boolean;

  @Column()
  slogan: string;

  @Column({ nullable: true, type: 'decimal' })
  amount?: number;

  @Column('simple-array')
  services: string[];
}
