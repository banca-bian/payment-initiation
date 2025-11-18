/**
 * DTO for OrderInitiation BQ response
 * Maps to BIAN RetrieveOrderInitiationResponse
 */
export class OrderInitiationResponseDto {
  stepId: string;
  paymentTransactionId: string;
  paymentOrderProcedureInstanceReference: string;
  paymentOrderProcedureInstanceStatus: string;
  orderInitiationTaskResult: string;
  stepStatus: string;
  createdAt: Date;

  // Include transaction details
  paymentTransactionType?: string;
  amount?: number;
  currency?: string;
  paymentMechanism?: string;
  payerReference?: string;
  payeeReference?: string;
}
