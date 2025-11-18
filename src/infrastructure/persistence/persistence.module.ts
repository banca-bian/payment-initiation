import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CustomerRelationshipSchema,
  PaymentTransactionSchema,
  PaymentInstructionSchema,
  TransactionStepSchema,
  TransactionSchema,
} from './typeorm/entities';
import {
  PaymentTransactionRepository,
  TransactionStepRepository,
  CustomerRelationshipRepository,
} from './typeorm/repositories';

/**
 * Persistence Module
 * Provides database repositories and TypeORM configuration
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRelationshipSchema,
      PaymentTransactionSchema,
      PaymentInstructionSchema,
      TransactionStepSchema,
      TransactionSchema,
    ]),
  ],
  providers: [
    {
      provide: 'IPaymentTransactionRepository',
      useClass: PaymentTransactionRepository,
    },
    {
      provide: 'ITransactionStepRepository',
      useClass: TransactionStepRepository,
    },
    {
      provide: 'ICustomerRelationshipRepository',
      useClass: CustomerRelationshipRepository,
    },
  ],
  exports: [
    'IPaymentTransactionRepository',
    'ITransactionStepRepository',
    'ICustomerRelationshipRepository',
  ],
})
export class PersistenceModule {}
