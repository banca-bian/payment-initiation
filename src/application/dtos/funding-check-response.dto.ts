/**
 * DTO for FundingCheck BQ response
 * Maps to BIAN RetrieveFundingCheckResponse
 */
export class FundingCheckResponseDto {
  stepId: string;
  paymentTransactionId: string;
  fundingCheckResult: string;
  stepStatus: string;
  createdAt: Date;

  // Include transaction details
  paymentTransactionType?: string;
  amount?: number;
  currency?: string;
  payerReference?: string;
  payerProductReference?: string;
}
