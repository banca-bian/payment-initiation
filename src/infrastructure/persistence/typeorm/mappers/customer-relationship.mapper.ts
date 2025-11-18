import { CustomerRelationship } from '../../../../domain/entities';
import { CustomerRelationshipSchema } from '../entities';

/**
 * Mapper between CustomerRelationship domain entity and CustomerRelationshipSchema
 */
export class CustomerRelationshipMapper {
  /**
   * Converts domain entity to database schema
   */
  static toPersistence(domain: CustomerRelationship): CustomerRelationshipSchema {
    const schema = new CustomerRelationshipSchema();

    if (domain.customerId) {
      schema.customer_id = domain.customerId;
    }

    schema.customer_name = domain.customerName;
    schema.document_type = domain.documentType;
    schema.document_number = domain.documentNumber;

    if (domain.createdAt) {
      schema.created_at = domain.createdAt;
    }

    return schema;
  }

  /**
   * Converts database schema to domain entity
   */
  static toDomain(schema: CustomerRelationshipSchema): CustomerRelationship {
    return new CustomerRelationship({
      customerId: schema.customer_id,
      customerName: schema.customer_name,
      documentType: schema.document_type,
      documentNumber: schema.document_number,
      createdAt: schema.created_at,
    });
  }
}
