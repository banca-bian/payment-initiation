import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { PaymentInitiationController } from './controllers/payment-initiation.controller';

/**
 * Presentation Module
 * Provides HTTP controllers and API endpoints
 */
@Module({
  imports: [ApplicationModule],
  controllers: [PaymentInitiationController],
})
export class PresentationModule {}
