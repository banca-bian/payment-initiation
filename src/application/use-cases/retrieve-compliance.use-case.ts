import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPaymentTransactionRepository,
  ITransactionStepRepository,
} from '../../domain/repositories';
import { TransactionStepType } from '../../domain/enums';
import { ComplianceResponseDto } from '../dtos';

/**
 * Use Case: Retrieve Compliance Check (BQ - Behavior Qualifier)
 * BIAN Operation: ReBQ Retrieve details about a payment transaction compliance check
 */
@Injectable()
export class RetrieveComplianceUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
    @Inject('ITransactionStepRepository')
    private readonly stepRepository: ITransactionStepRepository,
  ) {}

  async execute(paymentId: string, complianceId: string): Promise<ComplianceResponseDto> {
    // Verify payment transaction exists
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundException(`Payment transaction with id ${paymentId} not found`);
    }

    // Find compliance step
    const complianceStep = await this.stepRepository.findById(complianceId);

    if (!complianceStep || complianceStep.stepType !== TransactionStepType.COMPLIANCE) {
      throw new NotFoundException(`Compliance step with id ${complianceId} not found`);
    }

    if (complianceStep.paymentTransactionId !== paymentId) {
      throw new NotFoundException(
        `Compliance step ${complianceId} does not belong to payment ${paymentId}`,
      );
    }

    return {
      stepId: complianceStep.stepId,
      paymentTransactionId: complianceStep.paymentTransactionId,
      complianceCheckType: complianceStep.complianceCheckType || '',
      complianceCheckResult: complianceStep.complianceCheckResult || '',
      complianceTaskResult: complianceStep.complianceTaskResult || '',
      stepStatus: complianceStep.stepStatus,
      createdAt: complianceStep.createdAt,
      // Include transaction details
      paymentTransactionType: payment.paymentTransactionType,
      amount: payment.amount,
      currency: payment.currency,
      payerReference: payment.payerReference,
      payeeReference: payment.payeeReference,
    };
  }
}
