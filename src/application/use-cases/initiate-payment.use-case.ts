import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IPaymentTransactionRepository, ITransactionStepRepository } from '../../domain/repositories';
import { PaymentTransaction, TransactionStep } from '../../domain/entities';
import { PaymentStatus, TransactionStepType, StepStatus } from '../../domain/enums';
import { InitiatePaymentDto, PaymentResponseDto } from '../dtos';

/**
 * Use Case: Initiate Payment Transaction (CR - Control Record)
 * BIAN Operation: InCR Initiate a payment transaction
 */
@Injectable()
export class InitiatePaymentUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
    @Inject('ITransactionStepRepository')
    private readonly stepRepository: ITransactionStepRepository,
  ) {}

  async execute(dto: InitiatePaymentDto): Promise<PaymentResponseDto> {
    // Create payment transaction domain entity
    const paymentTransaction = new PaymentTransaction({
      paymentTransactionId: uuidv4(),
      customerId: dto.customerId,
      paymentTransactionType: dto.paymentTransactionType,
      payerReference: dto.payerReference,
      payerBankReference: dto.payerBankReference,
      payerProductReference: dto.payerProductReference,
      payeeReference: dto.payeeReference,
      payeeBankReference: dto.payeeBankReference,
      payeeProductReference: dto.payeeProductReference,
      amount: dto.amount,
      currency: dto.currency,
      paymentMechanism: dto.paymentMechanism,
      paymentPurpose: dto.paymentPurpose,
      dateType: dto.dateType,
      recurringPaymentRecord: dto.recurringPaymentRecord,
      recurringPaymentCustomerReference: dto.recurringPaymentCustomerReference,
      recurringPaymentReference: dto.recurringPaymentReference,
      documentDirectoryEntryInstanceReference: dto.documentDirectoryEntryInstanceReference,
      documentContent: dto.documentContent,
      status: PaymentStatus.INITIATED,
    });

    // Validate business rules
    paymentTransaction.validate();

    // Initiate the payment
    paymentTransaction.initiate();

    // Persist payment transaction
    const savedPayment = await this.paymentRepository.create(paymentTransaction);

    // Create initial transaction steps (BQs) - all pending
    await this.createInitialSteps(savedPayment.paymentTransactionId);

    // Update status to pending (awaiting processing steps)
    savedPayment.updateStatus(PaymentStatus.PENDING);
    await this.paymentRepository.update(savedPayment.paymentTransactionId, {
      status: PaymentStatus.PENDING,
      updatedAt: new Date(),
    });

    // Map to response DTO
    return this.mapToResponseDto(savedPayment);
  }

  /**
   * Creates initial BQ steps for the payment transaction
   */
  private async createInitialSteps(paymentTransactionId: string): Promise<void> {
    const steps: TransactionStepType[] = [
      TransactionStepType.COMPLIANCE,
      TransactionStepType.FUNDING_CHECK,
      TransactionStepType.ORDER_INITIATION,
    ];

    for (const stepType of steps) {
      const step = new TransactionStep({
        stepId: uuidv4(),
        paymentTransactionId,
        stepType,
        stepStatus: StepStatus.PENDING,
      });

      await this.stepRepository.create(step);
    }
  }

  /**
   * Maps domain entity to response DTO
   */
  private mapToResponseDto(payment: PaymentTransaction): PaymentResponseDto {
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
