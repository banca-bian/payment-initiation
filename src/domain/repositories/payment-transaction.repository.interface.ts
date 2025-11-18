import { PaymentTransaction } from '../entities';

/**
 * Payment Transaction Repository Interface (Port)
 * Defines the contract for payment transaction persistence
 */
export interface IPaymentTransactionRepository {
  /**
   * Creates a new payment transaction
   */
  create(transaction: PaymentTransaction): Promise<PaymentTransaction>;

  /**
   * Finds a payment transaction by ID
   */
  findById(id: string): Promise<PaymentTransaction | null>;

  /**
   * Updates an existing payment transaction
   */
  update(id: string, transaction: Partial<PaymentTransaction>): Promise<PaymentTransaction>;

  /**
   * Finds all transactions for a customer
   */
  findByCustomerId(customerId: string): Promise<PaymentTransaction[]>;

  /**
   * Finds transactions by status
   */
  findByStatus(status: string): Promise<PaymentTransaction[]>;

  /**
   * Finds recurring payment by reference
   */
  findByRecurringPaymentReference(reference: string): Promise<PaymentTransaction | null>;
}
