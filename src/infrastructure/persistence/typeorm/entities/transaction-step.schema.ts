import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PaymentTransactionSchema } from './payment-transaction.schema';
import { TransactionSchema } from './transaction.schema';

/**
 * Transaction Step Database Schema (BQ - Behavior Qualifier)
 * Maps to: transaction_step table
 */
@Entity('transaction_step')
export class TransactionStepSchema {
  @PrimaryGeneratedColumn('uuid')
  step_id: string;

  @Column({ type: 'uuid' })
  payment_transaction_id: string;

  @Column({ type: 'varchar', length: 50 })
  step_type: string;

  @Column({ type: 'text', nullable: true })
  step_result: string;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  step_status: string;

  // Compliance-specific fields
  @Column({ type: 'varchar', length: 50, nullable: true })
  compliance_check_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  compliance_check_result: string;

  @Column({ type: 'text', nullable: true })
  compliance_task_result: string;

  // FundingCheck-specific fields
  @Column({ type: 'varchar', length: 50, nullable: true })
  funding_check_result: string;

  // OrderInitiation-specific fields
  @Column({ type: 'varchar', length: 255, nullable: true })
  payment_order_procedure_instance_reference: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_order_procedure_instance_status: string;

  @Column({ type: 'text', nullable: true })
  order_initiation_task_result: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => PaymentTransactionSchema, (transaction) => transaction.steps)
  @JoinColumn({ name: 'payment_transaction_id' })
  paymentTransaction: PaymentTransactionSchema;

  @OneToMany(() => TransactionSchema, (transaction) => transaction.step)
  transactions: TransactionSchema[];
}
