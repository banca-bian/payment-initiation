import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { PaymentTransactionSchema } from './payment-transaction.schema';

/**
 * Customer Relationship Database Schema
 * Maps to: public.customer_relationship table
 */
@Entity('customer_relationship')
export class CustomerRelationshipSchema {
  @PrimaryGeneratedColumn('uuid')
  customer_id: string;

  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  @Column({ type: 'varchar', length: 50 })
  document_type: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  document_number: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => PaymentTransactionSchema, (transaction) => transaction.customer)
  transactions: PaymentTransactionSchema[];
}
