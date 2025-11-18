/**
 * PaymentInstruction Entity
 * Detailed instruction data for the payment
 */
export class PaymentInstruction {
  instructionId: string;
  paymentTransactionId: string;
  directionType?: string;
  instructionType?: string;
  requestedMechanism?: string;
  instructionDatetime?: Date;
  datetimeType?: string;
  processingValidityTime?: Date;
  priority?: string;
  clearingChannel?: string;
  creditDebitIndicator?: string;
  instructionStatus?: string;
  amount?: number;
  amountType?: string;
  createdAt: Date;

  constructor(partial: Partial<PaymentInstruction>) {
    Object.assign(this, partial);
  }

  /**
   * Validates instruction data
   */
  validate(): boolean {
    if (!this.paymentTransactionId) {
      throw new Error('Payment transaction reference is required');
    }
    return true;
  }

  /**
   * Checks if instruction is high priority
   */
  isHighPriority(): boolean {
    return this.priority === 'HIGH' || this.priority === 'URGENT';
  }
}
