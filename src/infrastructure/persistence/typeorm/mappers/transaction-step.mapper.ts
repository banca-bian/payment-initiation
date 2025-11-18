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
    schema.step_result = domain.stepResult;
    schema.step_status = domain.stepStatus;
    schema.compliance_check_type = domain.complianceCheckType;
    schema.compliance_check_result = domain.complianceCheckResult;
    schema.compliance_task_result = domain.complianceTaskResult;
    schema.funding_check_result = domain.fundingCheckResult;
    schema.payment_order_procedure_instance_reference =
      domain.paymentOrderProcedureInstanceReference;
    schema.payment_order_procedure_instance_status = domain.paymentOrderProcedureInstanceStatus;
    schema.order_initiation_task_result = domain.orderInitiationTaskResult;

    if (domain.createdAt) {
      schema.created_at = domain.createdAt;
    }

    return schema;
  }

  /**
   * Converts database schema to domain entity
   */
  static toDomain(schema: TransactionStepSchema): TransactionStep {
    return new TransactionStep({
      stepId: schema.step_id,
      paymentTransactionId: schema.payment_transaction_id,
      stepType: schema.step_type as TransactionStepType,
      stepResult: schema.step_result,
      stepStatus: schema.step_status as StepStatus,
      complianceCheckType: schema.compliance_check_type,
      complianceCheckResult: schema.compliance_check_result,
      complianceTaskResult: schema.compliance_task_result,
      fundingCheckResult: schema.funding_check_result,
      paymentOrderProcedureInstanceReference: schema.payment_order_procedure_instance_reference,
      paymentOrderProcedureInstanceStatus: schema.payment_order_procedure_instance_status,
      orderInitiationTaskResult: schema.order_initiation_task_result,
      createdAt: schema.created_at,
    });
  }
}
