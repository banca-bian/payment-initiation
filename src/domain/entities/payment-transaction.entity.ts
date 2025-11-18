import { PaymentTransactionType, PaymentMechanism, PaymentStatus } from '../enums';

/**
 * PaymentTransaction Entity (CR - Control Record)
 * Main entity representing a payment initiation transaction according to BIAN
 */
export class PaymentTransaction {
  paymentTransactionId: string;
  customerId: string;
  paymentTransactionType: PaymentTransactionType;

  // Payer information
  payerReference: string;
  payerBankReference: string;
  payerProductReference: string;

  // Payee information
  payeeReference: string;
  payeeBankReference: string;
  payeeProductReference: string;

  // Transaction details
  amount: number;
  currency: string;
  dateType?: string;
  dateValue?: Date;
  paymentMechanism: PaymentMechanism;
  paymentPurpose?: string;

  // Recurring payment support
  recurringPaymentRecord?: string;
  recurringPaymentCustomerReference?: string;
  recurringPaymentReference?: string;

  // Transaction status and metadata
  status: PaymentStatus;
  paymentFeesCharges?: number;
  documentDirectoryEntryInstanceReference?: string;
  documentContent?: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PaymentTransaction>) {
    Object.assign(this, partial);
  }

  /**
   * Initiates the payment transaction
   */
  initiate(): void {
    this.status = PaymentStatus.INITIATED;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Updates transaction status
   */
  updateStatus(newStatus: PaymentStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  /**
   * Checks if transaction can be updated
   */
  canUpdate(): boolean {
    return ![
      PaymentStatus.COMPLETED,
      PaymentStatus.FAILED,
      PaymentStatus.CANCELLED,
    ].includes(this.status);
  }

  /**
   * Validates payment transaction data
   */
  validate(): boolean {
    if (!this.payerReference || !this.payeeReference) {
      throw new Error('Payer and payee references are required');
    }
    if (!this.amount || this.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    if (!this.currency) {
      throw new Error('Currency is required');
    }
    return true;
  }

  /**
   * Checks if this is a recurring payment
   */
  isRecurring(): boolean {
    return !!this.recurringPaymentReference;
  }

  /**
   * Checks if this is an international payment
   */
  isInternational(): boolean {
    return this.paymentTransactionType === PaymentTransactionType.OVERSEAS;
  }
}
