/**
 * DTO for Compliance BQ response
 * Maps to BIAN RetrieveComplianceResponse
 */
export class ComplianceResponseDto {
  stepId: string;
  paymentTransactionId: string;
  complianceCheckType: string;
  complianceCheckResult: string;
  complianceTaskResult: string;
  stepStatus: string;
  createdAt: Date;

  // Include transaction details
  paymentTransactionType?: string;
  amount?: number;
  currency?: string;
  payerReference?: string;
  payeeReference?: string;
}
