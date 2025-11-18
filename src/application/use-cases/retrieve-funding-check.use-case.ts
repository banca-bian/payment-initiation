import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPaymentTransactionRepository,
  ITransactionStepRepository,
} from '../../domain/repositories';
import { TransactionStepType } from '../../domain/enums';
import { FundingCheckResponseDto } from '../dtos';

/**
 * Use Case: Retrieve Funding Check (BQ - Behavior Qualifier)
 * BIAN Operation: ReBQ Retrieve details about a payment transaction funds available
 */
@Injectable()
export class RetrieveFundingCheckUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
    @Inject('ITransactionStepRepository')
    private readonly stepRepository: ITransactionStepRepository,
  ) {}

  async execute(paymentId: string, fundingCheckId: string): Promise<FundingCheckResponseDto> {
    // Verify payment transaction exists
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundException(`Payment transaction with id ${paymentId} not found`);
    }

    // Find funding check step
    const fundingCheckStep = await this.stepRepository.findById(fundingCheckId);

    if (!fundingCheckStep || fundingCheckStep.stepType !== TransactionStepType.FUNDING_CHECK) {
      throw new NotFoundException(`Funding check step with id ${fundingCheckId} not found`);
    }

    if (fundingCheckStep.paymentTransactionId !== paymentId) {
      throw new NotFoundException(
        `Funding check step ${fundingCheckId} does not belong to payment ${paymentId}`,
      );
    }

    return {
      stepId: fundingCheckStep.stepId,
      paymentTransactionId: fundingCheckStep.paymentTransactionId,
      fundingCheckResult: fundingCheckStep.fundingCheckResult || '',
      stepStatus: fundingCheckStep.stepStatus,
      createdAt: fundingCheckStep.createdAt,
      // Include transaction details
      paymentTransactionType: payment.paymentTransactionType,
      amount: payment.amount,
      currency: payment.currency,
      payerReference: payment.payerReference,
      payerProductReference: payment.payerProductReference,
    };
  }
}
