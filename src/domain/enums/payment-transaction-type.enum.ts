/**
 * Types of payment transactions according to BIAN specification
 */
export enum PaymentTransactionType {
  OTC = 'OTC', // Over The Counter
  INTRA_ACCOUNT = 'INTRA_ACCOUNT', // Within same bank
  DOMESTIC = 'DOMESTIC', // Domestic transfer
  OVERSEAS = 'OVERSEAS', // International transfer
  RECURRING = 'RECURRING', // Recurring payment
  SCHEDULED = 'SCHEDULED', // Scheduled payment
}
