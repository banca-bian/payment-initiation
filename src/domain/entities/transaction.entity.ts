/**
 * Transaction Entity
 * Technical execution result for a transaction step
 */
export class Transaction {
  transactionId: string;
  stepId: string;
  technicalResult?: string;
  responsePayload?: any; // JSON payload from external systems
  createdAt: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }

  /**
   * Records technical result
   */
  recordResult(result: string, payload?: any): void {
    this.technicalResult = result;
    this.responsePayload = payload;
    this.createdAt = new Date();
  }

  /**
   * Validates transaction data
   */
  validate(): boolean {
    if (!this.stepId) {
      throw new Error('Step reference is required');
    }
    return true;
  }
}
