import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPaymentTransactionRepository } from '../../domain/repositories';
import { PaymentResponseDto } from '../dtos';

/**
 * Use Case: Retrieve Payment Transaction (CR - Control Record)
 * BIAN Operation: ReCR Retrieve details about a payment transaction
 */
@Injectable()
export class RetrievePaymentUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
  ) {}

  async execute(paymentId: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentRepository.findById(paymentId);

    if (!payment) {
      throw new NotFoundException(`Payment transaction with id ${paymentId} not found`);
    }

    return {
      paymentTransactionId: payment.paymentTransactionId,
      customerId: payment.customerId,
      paymentTransactionType: payment.paymentTransactionType,
      payerReference: payment.payerReference,
      payeeReference: payment.payeeReference,
      amount: payment.amount,
      currency: payment.currency,
      paymentMechanism: payment.paymentMechanism,
      status: payment.status,
      paymentPurpose: payment.paymentPurpose,
      recurringPaymentReference: payment.recurringPaymentReference,
      paymentFeesCharges: payment.paymentFeesCharges,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
