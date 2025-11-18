import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import {
  CustomerRelationshipSchema,
  PaymentTransactionSchema,
  PaymentInstructionSchema,
  TransactionStepSchema,
  TransactionSchema,
} from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    CustomerRelationshipSchema,
    PaymentTransactionSchema,
    PaymentInstructionSchema,
    TransactionStepSchema,
    TransactionSchema,
  ],
  migrations: ['src/infrastructure/persistence/typeorm/migrations/*.ts'],
  synchronize: false,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
