import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentTransactionSchema } from './payment-transaction.schema';

/**
 * Payment Instruction Database Schema
 * Maps to: payment_instruction table
 */
@Entity('payment_instruction')
export class PaymentInstructionSchema {
  @PrimaryGeneratedColumn('uuid')
  instruction_id: string;

  @Column({ type: 'uuid', unique: true })
  payment_transaction_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  direction_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  instruction_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  requested_mechanism: string;

  @Column({ type: 'timestamp', nullable: true })
  instruction_datetime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  datetime_type: string;

  @Column({ type: 'timestamp', nullable: true })
  processing_validity_time: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  priority: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  clearing_channel: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  credit_debit_indicator: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  instruction_status: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  amount_type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToOne(() => PaymentTransactionSchema, (transaction) => transaction.instruction)
  @JoinColumn({ name: 'payment_transaction_id' })
  paymentTransaction: PaymentTransactionSchema;
}
