import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaymentTransactionRepository } from '../../../../domain/repositories';
import { PaymentTransaction } from '../../../../domain/entities';
import { PaymentTransactionSchema } from '../entities';
import { PaymentTransactionMapper } from '../mappers';

/**
 * TypeORM implementation of Payment Transaction Repository
 */
@Injectable()
export class PaymentTransactionRepository implements IPaymentTransactionRepository {
  constructor(
    @InjectRepository(PaymentTransactionSchema)
    private readonly repository: Repository<PaymentTransactionSchema>,
  ) {}

  async create(transaction: PaymentTransaction): Promise<PaymentTransaction> {
    const schema = PaymentTransactionMapper.toPersistence(transaction);
    const saved = await this.repository.save(schema);
    return PaymentTransactionMapper.toDomain(saved);
  }

  async findById(id: string): Promise<PaymentTransaction | null> {
    const schema = await this.repository.findOne({
      where: { payment_transaction_id: id },
    });

    return schema ? PaymentTransactionMapper.toDomain(schema) : null;
  }

  async update(
    id: string,
    transaction: Partial<PaymentTransaction>,
  ): Promise<PaymentTransaction> {
    await this.repository.update({ payment_transaction_id: id }, transaction as any);

    const updated = await this.repository.findOne({
      where: { payment_transaction_id: id },
    });

    if (!updated) {
      throw new Error(`Payment transaction with id ${id} not found`);
    }

    return PaymentTransactionMapper.toDomain(updated);
  }

  async findByCustomerId(customerId: string): Promise<PaymentTransaction[]> {
    const schemas = await this.repository.find({
      where: { customer_id: customerId },
      order: { created_at: 'DESC' },
    });

    return schemas.map((schema) => PaymentTransactionMapper.toDomain(schema));
  }

  async findByStatus(status: string): Promise<PaymentTransaction[]> {
    const schemas = await this.repository.find({
      where: { status },
      order: { created_at: 'DESC' },
    });

    return schemas.map((schema) => PaymentTransactionMapper.toDomain(schema));
  }

  async findByRecurringPaymentReference(
    reference: string,
  ): Promise<PaymentTransaction | null> {
    const schema = await this.repository.findOne({
      where: { recurring_payment_reference: reference },
    });

    return schema ? PaymentTransactionMapper.toDomain(schema) : null;
  }
}
