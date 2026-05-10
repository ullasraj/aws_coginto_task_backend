import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "resend_otp_tracking" })
export class ResendOtpTracking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    type: "varchar",
  })
  email!: string;

  @Column({
    default: 0,
    type: "int",
  })
  resend_count!: number;
  @Column({
    type: "timestamp",
    nullable: true,
  })
  last_resend_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
