import { PaymentTransaction } from '../../../../domain/entities';
import { PaymentTransactionSchema } from '../entities';
import { PaymentTransactionType, PaymentMechanism, PaymentStatus } from '../../../../domain/enums';

/**
 * Mapper between PaymentTransaction domain entity and PaymentTransactionSchema
 */
export class PaymentTransactionMapper {
  /**
   * Converts domain entity to database schema
   */
  static toPersistence(domain: PaymentTransaction): PaymentTransactionSchema {
    const schema = new PaymentTransactionSchema();
    
    if (domain.paymentTransactionId) {
      schema.payment_transaction_id = domain.paymentTransactionId;
    }
    
    schema.customer_id = domain.customerId;
    schema.payment_transaction_type = domain.paymentTransactionType;
    schema.payer_reference = domain.payerReference;
    schema.payer_bank_reference = domain.payerBankReference ?? null;
    schema.payer_product_reference = domain.payerProductReference ?? null;
    schema.payee_reference = domain.payeeReference;
    schema.payee_bank_reference = domain.payeeBankReference ?? null;
    schema.payee_product_reference = domain.payeeProductReference ?? null;
    schema.amount = domain.amount;
    schema.currency = domain.currency;
    schema.date_type = domain.dateType ?? null;
    schema.date_value = domain.dateValue ?? null;
    schema.payment_mechanism = domain.paymentMechanism;
    schema.payment_purpose = domain.paymentPurpose ?? null;
    schema.recurring_payment_record = domain.recurringPaymentRecord ?? null;
    schema.recurring_payment_customer_reference = domain.recurringPaymentCustomerReference ?? null;
    schema.recurring_payment_reference = domain.recurringPaymentReference ?? null;
    schema.status = domain.status;
    schema.payment_fees_charges = domain.paymentFeesCharges ?? null;
    schema.document_directory_entry_instance_reference =
      domain.documentDirectoryEntryInstanceReference ?? null;
    schema.document_content = domain.documentContent ?? null;
    
    if (domain.createdAt) {
      schema.created_at = domain.createdAt;
    }
    if (domain.updatedAt) {
      schema.updated_at = domain.updatedAt;
    }
    
    return schema;
  }

  /**
   * Converts database schema to domain entity
   * ✅ CORREGIDO: Convierte null a undefined
   */
  static toDomain(schema: PaymentTransactionSchema): PaymentTransaction {
    return new PaymentTransaction({
      paymentTransactionId: schema.payment_transaction_id,
      customerId: schema.customer_id,
      paymentTransactionType: schema.payment_transaction_type as PaymentTransactionType,
      payerReference: schema.payer_reference,
      
      // ✅ Agregar ?? undefined a todos los campos opcionales
      payerBankReference: schema.payer_bank_reference ?? undefined,
      payerProductReference: schema.payer_product_reference ?? undefined,
      payeeReference: schema.payee_reference,
      payeeBankReference: schema.payee_bank_reference ?? undefined,
      payeeProductReference: schema.payee_product_reference ?? undefined,
      
      amount: Number(schema.amount),
      currency: schema.currency,
      
      dateType: schema.date_type ?? undefined,
      dateValue: schema.date_value ?? undefined,
      
      paymentMechanism: schema.payment_mechanism as PaymentMechanism,
      
      paymentPurpose: schema.payment_purpose ?? undefined,
      recurringPaymentRecord: schema.recurring_payment_record ?? undefined,
      recurringPaymentCustomerReference: schema.recurring_payment_customer_reference ?? undefined,
      recurringPaymentReference: schema.recurring_payment_reference ?? undefined,
      
      status: schema.status as PaymentStatus,
      
      paymentFeesCharges: schema.payment_fees_charges
        ? Number(schema.payment_fees_charges)
        : undefined,
      
      documentDirectoryEntryInstanceReference:
        schema.document_directory_entry_instance_reference ?? undefined,
      documentContent: schema.document_content ?? undefined,
      
      createdAt: schema.created_at,
      updatedAt: schema.updated_at,
    });
  }
}
