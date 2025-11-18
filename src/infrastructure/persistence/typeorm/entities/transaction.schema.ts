import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionStepSchema } from './transaction-step.schema';

/**
 * Transaction Database Schema
 * Technical execution result for a transaction step
 * Maps to: transaction table
 */
@Entity('transaction')
export class TransactionSchema {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column({ type: 'uuid' })
  step_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  technical_result: string;

  @Column({ type: 'jsonb', nullable: true })
  response_payload: any;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => TransactionStepSchema, (step) => step.transactions)
  @JoinColumn({ name: 'step_id' })
  step: TransactionStepSchema;
}
