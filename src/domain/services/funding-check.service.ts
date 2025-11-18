import { Injectable } from '@nestjs/common';
import { TransactionStep, PaymentTransaction } from '../entities';

/**
 * Domain Service: Funding Check
 * Implements business logic for verifying available funds
 */
@Injectable()
export class FundingCheckService {
  /**
   * Executes funding availability check for a payment transaction
   */
  async executeFundingCheck(
    step: TransactionStep,
    payment: PaymentTransaction,
  ): Promise<{ passed: boolean; result: string }> {
    // In a real implementation, this would:
    // 1. Call the Core Banking System to check account balance
    // 2. Check for holds/freezes on the account
    // 3. Verify payment limits
    // 4. Check for sufficient funds including fees

    const checkResult = await this.checkAccountBalance(payment);

    if (checkResult.hasSufficientFunds) {
      step.fundingCheckResult = 'SUFFICIENT_FUNDS';
      step.complete('Sufficient funds available');
      return { passed: true, result: 'SUFFICIENT_FUNDS' };
    } else {
      step.fundingCheckResult = 'INSUFFICIENT_FUNDS';
      step.fail(`Insufficient funds: Available ${checkResult.availableBalance}, Required ${checkResult.requiredAmount}`);
      return { passed: false, result: 'INSUFFICIENT_FUNDS' };
    }
  }

  /**
   * Checks account balance
   * In production, this would call the Core Banking System
   */
  private async checkAccountBalance(
    payment: PaymentTransaction,
  ): Promise<{ hasSufficientFunds: boolean; availableBalance: number; requiredAmount: number }> {
    // Simulated balance check
    // In production, would integrate with:
    // - Core Banking System
    // - Account Management Service
    // - Real-time balance APIs

    // Calculate total required amount (including fees)
    const fees = payment.paymentFeesCharges || this.calculateFees(payment);
    const requiredAmount = payment.amount + fees;

    // Simulated balance check
    // In reality, would call: await coreBankingService.getBalance(payment.payerProductReference)
    const simulatedBalance = 100000; // Simulated available balance

    return {
      hasSufficientFunds: simulatedBalance >= requiredAmount,
      availableBalance: simulatedBalance,
      requiredAmount: requiredAmount,
    };
  }

  /**
   * Calculates transaction fees
   */
  private calculateFees(payment: PaymentTransaction): number {
    // Business rules for fee calculation
    let fee = 0;

    // International transfer fees
    if (payment.isInternational()) {
      fee += payment.amount * 0.01; // 1% for international
      fee += 25; // Flat fee
    } else {
      fee += 2.5; // Domestic flat fee
    }

    // Payment mechanism fees
    switch (payment.paymentMechanism) {
      case 'SWIFT':
        fee += 15;
        break;
      case 'WIRE':
        fee += 10;
        break;
      case 'ACH':
        fee += 1;
        break;
    }

    return fee;
  }

  /**
   * Validates if funding check is required
   */
  isFundingCheckRequired(payment: PaymentTransaction): boolean {
    // All payments that debit an account require funding check
    return true;
  }
}
