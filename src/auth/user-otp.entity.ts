import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class UserOtp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.otpDetails)
  @JoinColumn()
  user: User;

  @Column()
  otp: string;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @Column({ default: 0 })
  otpAttempts: number;

  @Column({ default: false })
  otpAuthRestricted: boolean;

  @Column({ nullable: true })
  otpAuthRestrictedTill: Date | null;
}
