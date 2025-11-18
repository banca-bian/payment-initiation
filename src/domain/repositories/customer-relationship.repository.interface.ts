import { CustomerRelationship } from '../entities';

/**
 * Customer Relationship Repository Interface (Port)
 * Defines the contract for customer relationship persistence
 */
export interface ICustomerRelationshipRepository {
  /**
   * Creates a new customer relationship
   */
  create(customer: CustomerRelationship): Promise<CustomerRelationship>;

  /**
   * Finds a customer by ID
   */
  findById(id: string): Promise<CustomerRelationship | null>;

  /**
   * Finds a customer by document number
   */
  findByDocumentNumber(documentNumber: string): Promise<CustomerRelationship | null>;

  /**
   * Updates customer relationship
   */
  update(id: string, customer: Partial<CustomerRelationship>): Promise<CustomerRelationship>;
}
