/**
 * Types of compliance checks
 */
export enum ComplianceCheckType {
  AML = 'AML', // Anti-Money Laundering
  WATCHLIST = 'WATCHLIST', // Watchlist screening
  SANCTIONS = 'SANCTIONS', // Sanctions screening
  PEP = 'PEP', // Politically Exposed Person
  KYC = 'KYC', // Know Your Customer
}
