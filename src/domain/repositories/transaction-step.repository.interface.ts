import { TransactionStep } from '../entities';
import { TransactionStepType } from '../enums';

/**
 * Transaction Step Repository Interface (Port)
 * Defines the contract for transaction step persistence
 */
export interface ITransactionStepRepository {
  /**
   * Creates a new transaction step
   */
  create(step: TransactionStep): Promise<TransactionStep>;

  /**
   * Finds a transaction step by ID
   */
  findById(id: string): Promise<TransactionStep | null>;

  /**
   * Finds all steps for a payment transaction
   */
  findByPaymentTransactionId(paymentTransactionId: string): Promise<TransactionStep[]>;

  /**
   * Finds a specific step type for a payment transaction
   */
  findByPaymentTransactionIdAndType(
    paymentTransactionId: string,
    stepType: TransactionStepType,
  ): Promise<TransactionStep | null>;

  /**
   * Updates a transaction step
   */
  update(id: string, step: Partial<TransactionStep>): Promise<TransactionStep>;
}
