import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables
config({ path: path.resolve(__dirname, '.env') });

/**
 * Database Connection Test Script
 * Tests the connection to PostgreSQL/Supabase database
 */
async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...\n');

  // Display connection parameters (hiding password)
  console.log('📋 Connection Parameters:');
  console.log(`   Host: ${process.env.DATABASE_HOST}`);
  console.log(`   Port: ${process.env.DATABASE_PORT}`);
  console.log(`   Database: ${process.env.DATABASE_NAME}`);
  console.log(`   Username: ${process.env.DATABASE_USERNAME}`);
  console.log(`   SSL: ${process.env.DATABASE_SSL}`);
  console.log(`   Password: ${process.env.DATABASE_PASSWORD ? '***' : 'NOT SET'}\n`);

  // Create data source
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: true,
  });

  try {
    console.log('🔌 Attempting to connect...');
    await dataSource.initialize();

    console.log('✅ Successfully connected to the database!');

    // Test query
    console.log('\n🧪 Running test query...');
    const result = await dataSource.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Test query successful!');
    console.log(`   Current Time: ${result[0].current_time}`);
    console.log(`   PostgreSQL Version: ${result[0].pg_version}\n`);

    // Check if uuid extension exists
    console.log('🔍 Checking for uuid-ossp extension...');
    const extensionCheck = await dataSource.query(
      "SELECT * FROM pg_extension WHERE extname = 'uuid-ossp'"
    );

    if (extensionCheck.length > 0) {
      console.log('✅ uuid-ossp extension is installed');
    } else {
      console.log('⚠️  uuid-ossp extension is NOT installed');
      console.log('   Run this in Supabase SQL Editor:');
      console.log('   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n');
    }

    // List existing tables
    console.log('📊 Checking for existing tables...');
    const tables = await dataSource.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} table(s):`);
      tables.forEach((table: any) => {
        console.log(`   - ${table.table_name}`);
      });
    } else {
      console.log('⚠️  No tables found. You need to run migrations.');
      console.log('   Run: npm run migration:run\n');
    }

    await dataSource.destroy();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Connection test FAILED!\n');

    if (error.message.includes('Tenant or user not found')) {
      console.error('🔴 ERROR: Tenant or user not found');
      console.error('\nThis error typically means one of the following:');
      console.error('1. The database username is incorrect');
      console.error('2. The database password is incorrect');
      console.error('3. The database host is incorrect');
      console.error('4. The database name is incorrect\n');

      console.error('📝 Please verify your Supabase credentials:');
      console.error('   1. Go to https://supabase.com/dashboard');
      console.error('   2. Select your project');
      console.error('   3. Go to Settings > Database');
      console.error('   4. Check the "Connection string" section');
      console.error('   5. Update your .env file with the correct values\n');

      console.error('📋 Connection string format:');
      console.error('   postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres\n');

    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('🔴 ERROR: Connection refused');
      console.error('\nThe database server is not reachable.');
      console.error('Please check:');
      console.error('1. Is the DATABASE_HOST correct?');
      console.error('2. Is the DATABASE_PORT correct?');
      console.error('3. Is your internet connection working?');
      console.error('4. Are you using the correct Supabase project?\n');

    } else if (error.message.includes('timeout')) {
      console.error('🔴 ERROR: Connection timeout');
      console.error('\nThe connection timed out. This could mean:');
      console.error('1. Network connectivity issues');
      console.error('2. Firewall blocking the connection');
      console.error('3. Database server is down\n');

    } else {
      console.error('🔴 ERROR:', error.message);
      console.error('\nFull error details:');
      console.error(error);
    }

    process.exit(1);
  }
}

// Run the test
testDatabaseConnection();
