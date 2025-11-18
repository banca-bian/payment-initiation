import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CustomerRelationshipSchema } from './customer-relationship.schema';
import { TransactionStepSchema } from './transaction-step.schema';
import { PaymentInstructionSchema } from './payment-instruction.schema';

/**
 * Payment Transaction Database Schema (CR - Control Record)
 * Maps to: payment_transaction table
 */
@Entity('payment_transaction')
export class PaymentTransactionSchema {
  @PrimaryGeneratedColumn('uuid')
  payment_transaction_id: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @Column({ type: 'varchar', length: 50 })
  payment_transaction_type: string;

  // Payer information
  @Column({ type: 'varchar', length: 255 })
  payer_reference: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payer_bank_reference: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payer_product_reference: string;

  // Payee information
  @Column({ type: 'varchar', length: 255 })
  payee_reference: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payee_bank_reference: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payee_product_reference: string;

  // Transaction details
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  date_type: string;

  @Column({ type: 'timestamp', nullable: true })
  date_value: Date;

  @Column({ type: 'varchar', length: 50 })
  payment_mechanism: string;

  @Column({ type: 'text', nullable: true })
  payment_purpose: string;

  // Recurring payment support
  @Column({ type: 'text', nullable: true })
  recurring_payment_record: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recurring_payment_customer_reference: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recurring_payment_reference: string;

  // Additional fields
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  payment_fees_charges: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  document_directory_entry_instance_reference: string;

  @Column({ type: 'text', nullable: true })
  document_content: string;

  // Status
  @Column({ type: 'varchar', length: 50, default: 'INITIATED' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => CustomerRelationshipSchema, (customer) => customer.transactions)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerRelationshipSchema;

  @OneToMany(() => TransactionStepSchema, (step) => step.paymentTransaction)
  steps: TransactionStepSchema[];

  @OneToOne(() => PaymentInstructionSchema, (instruction) => instruction.paymentTransaction)
  instruction: PaymentInstructionSchema;
}
