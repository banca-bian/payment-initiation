import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRelationshipRepository } from '../../../../domain/repositories';
import { CustomerRelationship } from '../../../../domain/entities';
import { CustomerRelationshipSchema } from '../entities';
import { CustomerRelationshipMapper } from '../mappers';

/**
 * TypeORM implementation of Customer Relationship Repository
 */
@Injectable()
export class CustomerRelationshipRepository implements ICustomerRelationshipRepository {
  constructor(
    @InjectRepository(CustomerRelationshipSchema)
    private readonly repository: Repository<CustomerRelationshipSchema>,
  ) {}

  async create(customer: CustomerRelationship): Promise<CustomerRelationship> {
    const schema = CustomerRelationshipMapper.toPersistence(customer);
    const saved = await this.repository.save(schema);
    return CustomerRelationshipMapper.toDomain(saved);
  }

  async findById(id: string): Promise<CustomerRelationship | null> {
    const schema = await this.repository.findOne({
      where: { customer_id: id },
    });

    return schema ? CustomerRelationshipMapper.toDomain(schema) : null;
  }

  async findByDocumentNumber(documentNumber: string): Promise<CustomerRelationship | null> {
    const schema = await this.repository.findOne({
      where: { document_number: documentNumber },
    });

    return schema ? CustomerRelationshipMapper.toDomain(schema) : null;
  }

  async update(
    id: string,
    customer: Partial<CustomerRelationship>,
  ): Promise<CustomerRelationship> {
    await this.repository.update({ customer_id: id }, customer as any);

    const updated = await this.repository.findOne({
      where: { customer_id: id },
    });

    if (!updated) {
      throw new Error(`Customer with id ${id} not found`);
    }

    return CustomerRelationshipMapper.toDomain(updated);
  }
}
