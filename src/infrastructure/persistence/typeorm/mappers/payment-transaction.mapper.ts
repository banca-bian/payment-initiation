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
    schema.payer_bank_reference = domain.payerBankReference;
    schema.payer_product_reference = domain.payerProductReference;
    schema.payee_reference = domain.payeeReference;
    schema.payee_bank_reference = domain.payeeBankReference;
    schema.payee_product_reference = domain.payeeProductReference;
    schema.amount = domain.amount;
    schema.currency = domain.currency;
    schema.date_type = domain.dateType;
    schema.date_value = domain.dateValue;
    schema.payment_mechanism = domain.paymentMechanism;
    schema.payment_purpose = domain.paymentPurpose;
    schema.recurring_payment_record = domain.recurringPaymentRecord;
    schema.recurring_payment_customer_reference = domain.recurringPaymentCustomerReference;
    schema.recurring_payment_reference = domain.recurringPaymentReference;
    schema.status = domain.status;
    schema.payment_fees_charges = domain.paymentFeesCharges;
    schema.document_directory_entry_instance_reference =
      domain.documentDirectoryEntryInstanceReference;
    schema.document_content = domain.documentContent;

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
   */
  static toDomain(schema: PaymentTransactionSchema): PaymentTransaction {
    return new PaymentTransaction({
      paymentTransactionId: schema.payment_transaction_id,
      customerId: schema.customer_id,
      paymentTransactionType: schema.payment_transaction_type as PaymentTransactionType,
      payerReference: schema.payer_reference,
      payerBankReference: schema.payer_bank_reference,
      payerProductReference: schema.payer_product_reference,
      payeeReference: schema.payee_reference,
      payeeBankReference: schema.payee_bank_reference,
      payeeProductReference: schema.payee_product_reference,
      amount: Number(schema.amount),
      currency: schema.currency,
      dateType: schema.date_type,
      dateValue: schema.date_value,
      paymentMechanism: schema.payment_mechanism as PaymentMechanism,
      paymentPurpose: schema.payment_purpose,
      recurringPaymentRecord: schema.recurring_payment_record,
      recurringPaymentCustomerReference: schema.recurring_payment_customer_reference,
      recurringPaymentReference: schema.recurring_payment_reference,
      status: schema.status as PaymentStatus,
      paymentFeesCharges: schema.payment_fees_charges
        ? Number(schema.payment_fees_charges)
        : undefined,
      documentDirectoryEntryInstanceReference:
        schema.document_directory_entry_instance_reference,
      documentContent: schema.document_content,
      createdAt: schema.created_at,
      updatedAt: schema.updated_at,
    });
  }
}
