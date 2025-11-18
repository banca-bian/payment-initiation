import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import {
  CustomerRelationshipSchema,
  PaymentTransactionSchema,
  PaymentInstructionSchema,
  TransactionStepSchema,
  TransactionSchema,
} from '../persistence/typeorm/entities';

export default registerAs(
  'database',
  (): DataSourceOptions => ({
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
    synchronize: false, // Set to false in production, use migrations
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    logging: process.env.NODE_ENV === 'development',
  }),
);
