import { TransactionStep } from '../../../../domain/entities';
import { TransactionStepSchema } from '../entities';
import { TransactionStepType, StepStatus } from '../../../../domain/enums';

/**
 * Mapper between TransactionStep domain entity and TransactionStepSchema
 */
export class TransactionStepMapper {
  /**
   * Converts domain entity to database schema
   */
  static toPersistence(domain: TransactionStep): TransactionStepSchema {
    const schema = new TransactionStepSchema();
    
    if (domain.stepId) {
      schema.step_id = domain.stepId;
    }
    
    schema.payment_transaction_id = domain.paymentTransactionId;
    schema.step_type = domain.stepType;
    schema.step_result = domain.stepResult ?? null;
    schema.step_status = domain.stepStatus;
    schema.compliance_check_type = domain.complianceCheckType ?? null;
    schema.compliance_check_result = domain.complianceCheckResult ?? null;
    schema.compliance_task_result = domain.complianceTaskResult ?? null;
    schema.funding_check_result = domain.fundingCheckResult ?? null;
    schema.payment_order_procedure_instance_reference =
      domain.paymentOrderProcedureInstanceReference ?? null;
    schema.payment_order_procedure_instance_status = domain.paymentOrderProcedureInstanceStatus ?? null;
    schema.order_initiation_task_result = domain.orderInitiationTaskResult ?? null;
    
    if (domain.createdAt) {
      schema.created_at = domain.createdAt;
    }
    
    return schema;
  }

  /**
   * Converts database schema to domain entity
   * ✅ CORREGIDO: Convierte null a undefined
   */
  static toDomain(schema: TransactionStepSchema): TransactionStep {
    return new TransactionStep({
      stepId: schema.step_id,
      paymentTransactionId: schema.payment_transaction_id,
      stepType: schema.step_type as TransactionStepType,
      
      // ✅ Agregar ?? undefined a todos los campos opcionales
      stepResult: schema.step_result ?? undefined,
      stepStatus: schema.step_status as StepStatus,
      
      complianceCheckType: schema.compliance_check_type ?? undefined,
      complianceCheckResult: schema.compliance_check_result ?? undefined,
      complianceTaskResult: schema.compliance_task_result ?? undefined,
      fundingCheckResult: schema.funding_check_result ?? undefined,
      
      paymentOrderProcedureInstanceReference: 
        schema.payment_order_procedure_instance_reference ?? undefined,
      paymentOrderProcedureInstanceStatus: 
        schema.payment_order_procedure_instance_status ?? undefined,
      orderInitiationTaskResult: schema.order_initiation_task_result ?? undefined,
      
      createdAt: schema.created_at,
    });
  }
}
