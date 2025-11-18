import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create customer_relationship table
    await queryRunner.query(`
      CREATE TABLE "customer_relationship" (
        "customer_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "customer_name" varchar(255) NOT NULL,
        "document_type" varchar(50) NOT NULL,
        "document_number" varchar(100) NOT NULL UNIQUE,
        "created_at" timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create payment_transaction table
    await queryRunner.query(`
      CREATE TABLE "payment_transaction" (
        "payment_transaction_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "customer_id" uuid NOT NULL,
        "payment_transaction_type" varchar(50) NOT NULL,
        "payer_reference" varchar(255) NOT NULL,
        "payer_bank_reference" varchar(255),
        "payer_product_reference" varchar(255),
        "payee_reference" varchar(255) NOT NULL,
        "payee_bank_reference" varchar(255),
        "payee_product_reference" varchar(255),
        "amount" decimal(18,2) NOT NULL,
        "currency" varchar(3) NOT NULL,
        "date_type" varchar(50),
        "date_value" timestamp,
        "payment_mechanism" varchar(50) NOT NULL,
        "payment_purpose" text,
        "recurring_payment_record" text,
        "recurring_payment_customer_reference" varchar(255),
        "recurring_payment_reference" varchar(255),
        "payment_fees_charges" decimal(18,2),
        "document_directory_entry_instance_reference" varchar(255),
        "document_content" text,
        "status" varchar(50) NOT NULL DEFAULT 'INITIATED',
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "fk_payment_transaction_customer"
          FOREIGN KEY ("customer_id")
          REFERENCES "customer_relationship"("customer_id")
          ON DELETE CASCADE
      )
    `);

    // Create payment_instruction table
    await queryRunner.query(`
      CREATE TABLE "payment_instruction" (
        "instruction_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "payment_transaction_id" uuid NOT NULL UNIQUE,
        "direction_type" varchar(50),
        "instruction_type" varchar(50),
        "requested_mechanism" varchar(50),
        "instruction_datetime" timestamp,
        "datetime_type" varchar(50),
        "processing_validity_time" timestamp,
        "priority" varchar(20),
        "clearing_channel" varchar(50),
        "credit_debit_indicator" varchar(10),
        "instruction_status" varchar(50),
        "amount" decimal(18,2),
        "amount_type" varchar(50),
        "created_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "fk_payment_instruction_transaction"
          FOREIGN KEY ("payment_transaction_id")
          REFERENCES "payment_transaction"("payment_transaction_id")
          ON DELETE CASCADE
      )
    `);

    // Create transaction_step table
    await queryRunner.query(`
      CREATE TABLE "transaction_step" (
        "step_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "payment_transaction_id" uuid NOT NULL,
        "step_type" varchar(50) NOT NULL,
        "step_result" text,
        "step_status" varchar(50) NOT NULL DEFAULT 'PENDING',
        "compliance_check_type" varchar(50),
        "compliance_check_result" varchar(50),
        "compliance_task_result" text,
        "funding_check_result" varchar(50),
        "payment_order_procedure_instance_reference" varchar(255),
        "payment_order_procedure_instance_status" varchar(50),
        "order_initiation_task_result" text,
        "created_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "fk_transaction_step_payment"
          FOREIGN KEY ("payment_transaction_id")
          REFERENCES "payment_transaction"("payment_transaction_id")
          ON DELETE CASCADE
      )
    `);

    // Create transaction table
    await queryRunner.query(`
      CREATE TABLE "transaction" (
        "transaction_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "step_id" uuid NOT NULL,
        "technical_result" varchar(50),
        "response_payload" jsonb,
        "created_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "fk_transaction_step"
          FOREIGN KEY ("step_id")
          REFERENCES "transaction_step"("step_id")
          ON DELETE CASCADE
      )
    `);

    // Create indexes for better performance
    await queryRunner.query(`
      CREATE INDEX "idx_payment_transaction_customer_id"
      ON "payment_transaction"("customer_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_payment_transaction_status"
      ON "payment_transaction"("status")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_payment_transaction_recurring_ref"
      ON "payment_transaction"("recurring_payment_reference")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_transaction_step_payment_id"
      ON "transaction_step"("payment_transaction_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_transaction_step_type"
      ON "transaction_step"("step_type")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_transaction_step_id"
      ON "transaction"("step_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_transaction_step_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_transaction_step_type"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_transaction_step_payment_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_payment_transaction_recurring_ref"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_payment_transaction_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_payment_transaction_customer_id"`);

    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS "transaction"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "transaction_step"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "payment_instruction"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "payment_transaction"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "customer_relationship"`);
  }
}
