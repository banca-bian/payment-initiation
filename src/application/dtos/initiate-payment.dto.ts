import { IsString, IsNumber, IsOptional, IsEnum, Min, IsNotEmpty } from 'class-validator';
import { PaymentTransactionType, PaymentMechanism } from '../../domain/enums';

/**
 * DTO for initiating a payment transaction
 * Maps to BIAN InitiatePaymentInitiationTransactionRequest
 */
export class InitiatePaymentDto {
  @IsEnum(PaymentTransactionType)
  @IsNotEmpty()
  paymentTransactionType: PaymentTransactionType;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  // Payer information
  @IsString()
  @IsNotEmpty()
  payerReference: string;

  @IsString()
  @IsOptional()
  payerBankReference?: string;

  @IsString()
  @IsOptional()
  payerProductReference?: string;

  // Payee information
  @IsString()
  @IsNotEmpty()
  payeeReference: string;

  @IsString()
  @IsOptional()
  payeeBankReference?: string;

  @IsString()
  @IsOptional()
  payeeProductReference?: string;

  // Transaction details
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEnum(PaymentMechanism)
  @IsNotEmpty()
  paymentMechanism: PaymentMechanism;

  @IsString()
  @IsOptional()
  paymentPurpose?: string;

  @IsString()
  @IsOptional()
  dateType?: string;

  // Recurring payment support
  @IsString()
  @IsOptional()
  recurringPaymentRecord?: string;

  @IsString()
  @IsOptional()
  recurringPaymentCustomerReference?: string;

  @IsString()
  @IsOptional()
  recurringPaymentReference?: string;

  // Document support
  @IsString()
  @IsOptional()
  documentDirectoryEntryInstanceReference?: string;

  @IsString()
  @IsOptional()
  documentContent?: string;
}
