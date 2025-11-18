/**
 * BQ (Behavior Qualifier) step types according to BIAN
 */
export enum TransactionStepType {
  COMPLIANCE = 'COMPLIANCE', // Compliance check (AML, watchlists)
  FUNDING_CHECK = 'FUNDING_CHECK', // Funds availability check
  ORDER_INITIATION = 'ORDER_INITIATION', // Payment order initiation
}
