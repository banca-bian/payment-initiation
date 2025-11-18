/**
 * CustomerRelationship Entity
 * Represents the customer initiating the payment transaction
 */
export class CustomerRelationship {
  customerId: string;
  customerName: string;
  documentType: string;
  documentNumber: string;
  createdAt: Date;

  constructor(partial: Partial<CustomerRelationship>) {
    Object.assign(this, partial);
  }

  /**
   * Validates customer relationship data
   */
  validate(): boolean {
    if (!this.customerId || !this.customerName || !this.documentNumber) {
      throw new Error('Customer relationship missing required fields');
    }
    return true;
  }
}
