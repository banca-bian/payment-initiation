import { Injectable } from '@nestjs/common';
import { TransactionStep, PaymentTransaction } from '../entities';
import { ComplianceCheckType, StepStatus } from '../enums';

/**
 * Domain Service: Compliance Check
 * Implements business logic for AML, watchlist, and sanctions screening
 */
@Injectable()
export class ComplianceService {
  /**
   * Executes compliance check for a payment transaction
   */
  async executeComplianceCheck(
    step: TransactionStep,
    payment: PaymentTransaction,
  ): Promise<{ passed: boolean; result: string }> {
    const checks: ComplianceCheckType[] = [
      ComplianceCheckType.AML,
      ComplianceCheckType.WATCHLIST,
      ComplianceCheckType.SANCTIONS,
    ];

    const results: string[] = [];

    // Execute all compliance checks
    for (const checkType of checks) {
      const checkResult = await this.performCheck(checkType, payment);
      results.push(`${checkType}: ${checkResult}`);

      // If any check fails, compliance fails
      if (checkResult === 'FAILED' || checkResult === 'FLAGGED') {
        step.complianceCheckType = checkType;
        step.complianceCheckResult = 'FAILED';
        step.complianceTaskResult = results.join('; ');
        step.fail('Compliance check failed: ' + checkType);
        return { passed: false, result: 'FAILED' };
      }
    }

    // All checks passed
    step.complianceCheckType = 'ALL';
    step.complianceCheckResult = 'PASSED';
    step.complianceTaskResult = results.join('; ');
    step.complete('All compliance checks passed');

    return { passed: true, result: 'PASSED' };
  }

  /**
   * Performs individual compliance check
   * In a real implementation, this would call external services
   */
  private async performCheck(
    checkType: ComplianceCheckType,
    payment: PaymentTransaction,
  ): Promise<string> {
    // Simulated compliance logic
    // In production, this would integrate with:
    // - AML systems
    // - Watchlist databases (OFAC, UN, EU, etc.)
    // - Sanctions screening services
    // - PEP databases

    // Business rules for demonstration
    if (checkType === ComplianceCheckType.AML) {
      // Check for suspicious patterns
      if (payment.amount > 10000 && payment.isInternational()) {
        // Would trigger enhanced due diligence in real system
        return 'PASSED_REVIEW_REQUIRED';
      }
      return 'PASSED';
    }

    if (checkType === ComplianceCheckType.WATCHLIST) {
      // Check payer and payee against watchlists
      // This is simulated - real system would query actual databases
      return 'PASSED';
    }

    if (checkType === ComplianceCheckType.SANCTIONS) {
      // Check for sanctioned countries/entities
      // This is simulated - real system would check actual sanctions lists
      return 'PASSED';
    }

    return 'PASSED';
  }

  /**
   * Validates if compliance check is required
   */
  isComplianceRequired(payment: PaymentTransaction): boolean {
    // All international payments require compliance
    if (payment.isInternational()) {
      return true;
    }

    // High-value domestic payments require compliance
    if (payment.amount > 5000) {
      return true;
    }

    return true; // Default: all payments require basic compliance
  }
}
