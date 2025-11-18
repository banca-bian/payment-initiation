import { Module } from '@nestjs/common';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import {
  InitiatePaymentUseCase,
  UpdatePaymentUseCase,
  RetrievePaymentUseCase,
  RetrieveComplianceUseCase,
  RetrieveFundingCheckUseCase,
  RetrieveOrderInitiationUseCase,
} from './use-cases';
import {
  ComplianceService,
  FundingCheckService,
  OrderInitiationService,
} from '../domain/services';

/**
 * Application Module
 * Provides use cases and domain services
 */
@Module({
  imports: [PersistenceModule],
  providers: [
    // Use Cases
    InitiatePaymentUseCase,
    UpdatePaymentUseCase,
    RetrievePaymentUseCase,
    RetrieveComplianceUseCase,
    RetrieveFundingCheckUseCase,
    RetrieveOrderInitiationUseCase,
    // Domain Services
    ComplianceService,
    FundingCheckService,
    OrderInitiationService,
  ],
  exports: [
    InitiatePaymentUseCase,
    UpdatePaymentUseCase,
    RetrievePaymentUseCase,
    RetrieveComplianceUseCase,
    RetrieveFundingCheckUseCase,
    RetrieveOrderInitiationUseCase,
    ComplianceService,
    FundingCheckService,
    OrderInitiationService,
  ],
})
export class ApplicationModule {}
