/**
 * Payment transaction status
 */
export enum PaymentStatus {
  INITIATED = 'INITIATED', // Payment has been initiated
  PENDING = 'PENDING', // Awaiting processing
  COMPLIANCE_CHECK = 'COMPLIANCE_CHECK', // Under compliance review
  FUNDING_CHECK = 'FUNDING_CHECK', // Checking available funds
  APPROVED = 'APPROVED', // Approved for execution
  SENT = 'SENT', // Sent to payment network
  PROCESSING = 'PROCESSING', // Being processed
  COMPLETED = 'COMPLETED', // Successfully completed
  FAILED = 'FAILED', // Failed
  REJECTED = 'REJECTED', // Rejected
  CANCELLED = 'CANCELLED', // Cancelled
}
