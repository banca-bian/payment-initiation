import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { PaymentTransactionType, PaymentMechanism } from '../../domain/enums';

/**
 * DTO for updating a payment transaction
 * Maps to BIAN UpdatePaymentInitiationTransactionRequest
 */
export class UpdatePaymentDto {
  @IsEnum(PaymentTransactionType)
  @IsOptional()
  paymentTransactionType?: PaymentTransactionType;

  @IsString()
  @IsOptional()
  payerReference?: string;

  @IsString()
  @IsOptional()
  payerBankReference?: string;

  @IsString()
  @IsOptional()
  payerProductReference?: string;

  @IsString()
  @IsOptional()
  payeeReference?: string;

  @IsString()
  @IsOptional()
  payeeBankReference?: string;

  @IsString()
  @IsOptional()
  payeeProductReference?: string;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(PaymentMechanism)
  @IsOptional()
  paymentMechanism?: PaymentMechanism;

  @IsString()
  @IsOptional()
  paymentPurpose?: string;

  @IsString()
  @IsOptional()
  dateType?: string;

  @IsString()
  @IsOptional()
  recurringPaymentRecord?: string;

  @IsString()
  @IsOptional()
  documentDirectoryEntryInstanceReference?: string;

  @IsString()
  @IsOptional()
  documentContent?: string;
}
