import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IPaymentTransactionRepository } from '../../domain/repositories';
import { UpdatePaymentDto, PaymentResponseDto } from '../dtos';

/**
 * Use Case: Update Payment Transaction (CR - Control Record)
 * BIAN Operation: UpCR Update details of a payment transaction instruction
 */
@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
  ) {}

  async execute(paymentId: string, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    // Find existing payment transaction
    const existingPayment = await this.paymentRepository.findById(paymentId);

    if (!existingPayment) {
      throw new NotFoundException(`Payment transaction with id ${paymentId} not found`);
    }

    // Check if payment can be updated
    if (!existingPayment.canUpdate()) {
      throw new BadRequestException(
        `Payment transaction with status ${existingPayment.status} cannot be updated`,
      );
    }

    // Update payment transaction
    const updatedPayment = await this.paymentRepository.update(paymentId, {
      ...dto,
      updatedAt: new Date(),
    });

    // Map to response DTO
    return {
      paymentTransactionId: updatedPayment.paymentTransactionId,
      customerId: updatedPayment.customerId,
      paymentTransactionType: updatedPayment.paymentTransactionType,
      payerReference: updatedPayment.payerReference,
      payeeReference: updatedPayment.payeeReference,
      amount: updatedPayment.amount,
      currency: updatedPayment.currency,
      paymentMechanism: updatedPayment.paymentMechanism,
      status: updatedPayment.status,
      paymentPurpose: updatedPayment.paymentPurpose,
      recurringPaymentReference: updatedPayment.recurringPaymentReference,
      paymentFeesCharges: updatedPayment.paymentFeesCharges,
      createdAt: updatedPayment.createdAt,
      updatedAt: updatedPayment.updatedAt,
    };
  }
}
