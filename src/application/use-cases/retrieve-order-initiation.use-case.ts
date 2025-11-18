import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPaymentTransactionRepository,
  ITransactionStepRepository,
} from '../../domain/repositories';
import { TransactionStepType } from '../../domain/enums';
import { OrderInitiationResponseDto } from '../dtos';

/**
 * Use Case: Retrieve Order Initiation (BQ - Behavior Qualifier)
 * BIAN Operation: ReBQ Retrieve details about the payment order initiation
 */
@Injectable()
export class RetrieveOrderInitiationUseCase {
  constructor(
    @Inject('IPaymentTransactionRepository')
    private readonly paymentRepository: IPaymentTransactionRepository,
    @Inject('ITransactionStepRepository')
    private readonly stepRepository: ITransactionStepRepository,
  ) {}

  async execute(
    paymentId: string,
    orderInitiationId: string,
  ): Promise<OrderInitiationResponseDto> {
    // Verify payment transaction exists
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundException(`Payment transaction with id ${paymentId} not found`);
    }

    // Find order initiation step
    const orderInitiationStep = await this.stepRepository.findById(orderInitiationId);

    if (
      !orderInitiationStep ||
      orderInitiationStep.stepType !== TransactionStepType.ORDER_INITIATION
    ) {
      throw new NotFoundException(`Order initiation step with id ${orderInitiationId} not found`);
    }

    if (orderInitiationStep.paymentTransactionId !== paymentId) {
      throw new NotFoundException(
        `Order initiation step ${orderInitiationId} does not belong to payment ${paymentId}`,
      );
    }

    return {
      stepId: orderInitiationStep.stepId,
      paymentTransactionId: orderInitiationStep.paymentTransactionId,
      paymentOrderProcedureInstanceReference:
        orderInitiationStep.paymentOrderProcedureInstanceReference || '',
      paymentOrderProcedureInstanceStatus:
        orderInitiationStep.paymentOrderProcedureInstanceStatus || '',
      orderInitiationTaskResult: orderInitiationStep.orderInitiationTaskResult || '',
      stepStatus: orderInitiationStep.stepStatus,
      createdAt: orderInitiationStep.createdAt,
      // Include transaction details
      paymentTransactionType: payment.paymentTransactionType,
      amount: payment.amount,
      currency: payment.currency,
      paymentMechanism: payment.paymentMechanism,
      payerReference: payment.payerReference,
      payeeReference: payment.payeeReference,
    };
  }
}
