/**
 * Payment mechanisms according to BIAN specification
 */
export enum PaymentMechanism {
  SWIFT = 'SWIFT', // SWIFT network
  ACH = 'ACH', // Automated Clearing House
  SEPA = 'SEPA', // Single Euro Payments Area
  INTRA_ACCOUNT = 'INTRA_ACCOUNT', // Internal account transfer
  WIRE = 'WIRE', // Wire transfer
  REAL_TIME = 'REAL_TIME', // Real-time payment
  CHECK = 'CHECK', // Check payment
}
