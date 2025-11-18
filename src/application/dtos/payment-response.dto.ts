import { PaymentStatus } from '../../domain/enums';

/**
 * DTO for payment transaction response
 */
export class PaymentResponseDto {
  paymentTransactionId: string;
  customerId: string;
  paymentTransactionType: string;
  payerReference: string;
  payeeReference: string;
  amount: number;
  currency: string;
  paymentMechanism: string;
  status: PaymentStatus;
  paymentPurpose?: string;
  recurringPaymentReference?: string;
  paymentFeesCharges?: number;
  createdAt: Date;
  updatedAt: Date;
}
