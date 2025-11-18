import { TransactionStepType, StepStatus } from '../enums';

/**
 * TransactionStep Entity (BQ - Behavior Qualifier)
 * Represents sub-tasks in payment processing (Compliance, FundingCheck, OrderInitiation)
 */
export class TransactionStep {
  stepId: string;
  paymentTransactionId: string;
  stepType: TransactionStepType;
  stepResult?: string;
  stepStatus: StepStatus;

  // Compliance-specific fields
  complianceCheckType?: string;
  complianceCheckResult?: string;
  complianceTaskResult?: string;

  // FundingCheck-specific fields
  fundingCheckResult?: string;

  // OrderInitiation-specific fields
  paymentOrderProcedureInstanceReference?: string;
  paymentOrderProcedureInstanceStatus?: string;
  orderInitiationTaskResult?: string;

  createdAt: Date;

  constructor(partial: Partial<TransactionStep>) {
    Object.assign(this, partial);
  }

  /**
   * Marks step as completed
   */
  complete(result: string): void {
    this.stepStatus = StepStatus.COMPLETED;
    this.stepResult = result;
  }

  /**
   * Marks step as failed
   */
  fail(result: string): void {
    this.stepStatus = StepStatus.FAILED;
    this.stepResult = result;
  }

  /**
   * Checks if step is a compliance check
   */
  isComplianceCheck(): boolean {
    return this.stepType === TransactionStepType.COMPLIANCE;
  }

  /**
   * Checks if step is a funding check
   */
  isFundingCheck(): boolean {
    return this.stepType === TransactionStepType.FUNDING_CHECK;
  }

  /**
   * Checks if step is an order initiation
   */
  isOrderInitiation(): boolean {
    return this.stepType === TransactionStepType.ORDER_INITIATION;
  }

  /**
   * Validates step data
   */
  validate(): boolean {
    if (!this.paymentTransactionId || !this.stepType) {
      throw new Error('Transaction step missing required fields');
    }
    return true;
  }
}
