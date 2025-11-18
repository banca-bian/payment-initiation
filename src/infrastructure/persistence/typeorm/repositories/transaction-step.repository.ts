import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransactionStepRepository } from '../../../../domain/repositories';
import { TransactionStep } from '../../../../domain/entities';
import { TransactionStepType } from '../../../../domain/enums';
import { TransactionStepSchema } from '../entities';
import { TransactionStepMapper } from '../mappers';

/**
 * TypeORM implementation of Transaction Step Repository
 */
@Injectable()
export class TransactionStepRepository implements ITransactionStepRepository {
  constructor(
    @InjectRepository(TransactionStepSchema)
    private readonly repository: Repository<TransactionStepSchema>,
  ) {}

  async create(step: TransactionStep): Promise<TransactionStep> {
    const schema = TransactionStepMapper.toPersistence(step);
    const saved = await this.repository.save(schema);
    return TransactionStepMapper.toDomain(saved);
  }

  async findById(id: string): Promise<TransactionStep | null> {
    const schema = await this.repository.findOne({
      where: { step_id: id },
    });

    return schema ? TransactionStepMapper.toDomain(schema) : null;
  }

  async findByPaymentTransactionId(paymentTransactionId: string): Promise<TransactionStep[]> {
    const schemas = await this.repository.find({
      where: { payment_transaction_id: paymentTransactionId },
      order: { created_at: 'ASC' },
    });

    return schemas.map((schema) => TransactionStepMapper.toDomain(schema));
  }

  async findByPaymentTransactionIdAndType(
    paymentTransactionId: string,
    stepType: TransactionStepType,
  ): Promise<TransactionStep | null> {
    const schema = await this.repository.findOne({
      where: {
        payment_transaction_id: paymentTransactionId,
        step_type: stepType,
      },
    });

    return schema ? TransactionStepMapper.toDomain(schema) : null;
  }

  async update(id: string, step: Partial<TransactionStep>): Promise<TransactionStep> {
    await this.repository.update({ step_id: id }, step as any);

    const updated = await this.repository.findOne({
      where: { step_id: id },
    });

    if (!updated) {
      throw new Error(`Transaction step with id ${id} not found`);
    }

    return TransactionStepMapper.toDomain(updated);
  }
}
