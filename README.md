# Payment Initiation Microservice

Microservicio del dominio de servicio **Payment Initiation** de BIAN (Banking Industry Architecture Network) implementado con arquitectura hexagonal en NestJS.

## Descripción

Este microservicio gestiona los pagos para clientes particulares y empresas. Los pagos se realizan a otras cuentas dentro del mismo banco, a otros bancos y, posiblemente, a nivel internacional, utilizando el mecanismo de pago más adecuado para la transacción. El dominio de servicio puede gestionar transacciones individuales o pagos recurrentes/programados si se solicita.

### Características Principales

- ✅ Arquitectura Hexagonal (Ports & Adapters)
- ✅ BIAN 12.0 Compliant
- ✅ NestJS Framework
- ✅ PostgreSQL (Supabase)
- ✅ TypeORM para persistencia
- ✅ Validación de datos con class-validator
- ✅ Documentación Swagger/OpenAPI
- ✅ Control Record (CR) y Behavior Qualifiers (BQ)

## Arquitectura

```
src/
├── domain/                      # Capa de Dominio (Lógica de Negocio)
│   ├── entities/               # Entidades del dominio
│   ├── enums/                  # Enumeraciones
│   ├── repositories/           # Interfaces de repositorios (Ports)
│   └── services/               # Servicios de dominio (BQ logic)
│
├── application/                 # Capa de Aplicación (Casos de Uso)
│   ├── use-cases/              # Casos de uso del negocio
│   └── dtos/                   # Data Transfer Objects
│
├── infrastructure/              # Capa de Infraestructura (Adaptadores)
│   ├── persistence/            # Persistencia de datos
│   │   └── typeorm/
│   │       ├── entities/       # Schemas de BD
│   │       ├── repositories/   # Implementaciones de repositorios
│   │       ├── mappers/        # Mappers Domain <-> Schema
│   │       └── migrations/     # Migraciones de BD
│   └── config/                 # Configuraciones
│
└── presentation/                # Capa de Presentación (API REST)
    ├── controllers/            # Controladores HTTP
    └── filters/                # Filtros de excepciones
```

## Modelo de Datos BIAN

### Control Record (CR)
- **PaymentTransaction**: Transacción principal de pago

### Behavior Qualifiers (BQ)
- **Compliance**: Verificación de cumplimiento (AML, watchlists, sanctions)
- **FundingCheck**: Verificación de fondos disponibles
- **OrderInitiation**: Iniciación de orden de pago a redes de clearing

### Tablas de Base de Datos
1. `customer_relationship` - Relación con el cliente
2. `payment_transaction` - Transacción de pago (CR)
3. `payment_instruction` - Instrucción detallada de pago
4. `transaction_step` - Pasos de procesamiento (BQ)
5. `transaction` - Resultados técnicos de ejecución

## Prerequisitos

- Node.js >= 18.x
- PostgreSQL 14+ (o cuenta en Supabase)
- npm o yarn

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd payment-initiation
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de Supabase:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Supabase PostgreSQL
DATABASE_HOST=your-project.supabase.co
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=postgres
DATABASE_SSL=true

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Ejecutar migraciones

```bash
# Generar migración (si se modifican entidades)
npm run migration:generate -- src/infrastructure/persistence/typeorm/migrations/MigrationName

# Ejecutar migraciones
npm run migration:run
```

### 5. Iniciar el servidor

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor estará disponible en:
- **API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs

## API Endpoints (BIAN Compliant)

### Control Record (CR) - PaymentInitiationTransaction

#### 1. Initiate Payment Transaction
```http
POST /api/v1/PaymentInitiation/Initiate
Content-Type: application/json

{
  "paymentTransactionType": "OVERSEAS",
  "customerId": "customer-uuid",
  "payerReference": "ACC-123456",
  "payerBankReference": "BANK-001",
  "payerProductReference": "ACC-123456",
  "payeeReference": "ACC-789012",
  "payeeBankReference": "BANK-002",
  "payeeProductReference": "ACC-789012",
  "amount": 1000.00,
  "currency": "USD",
  "paymentMechanism": "SWIFT",
  "paymentPurpose": "Invoice payment"
}
```

#### 2. Update Payment Transaction
```http
PUT /api/v1/PaymentInitiation/{paymentinitiationid}/Update
Content-Type: application/json

{
  "amount": 1500.00,
  "paymentPurpose": "Updated purpose"
}
```

#### 3. Retrieve Payment Transaction
```http
GET /api/v1/PaymentInitiation/{paymentinitiationid}/Retrieve
```

### Behavior Qualifiers (BQ)

#### 4. Retrieve Compliance Check
```http
GET /api/v1/PaymentInitiation/{paymentinitiationid}/Compliance/{complianceid}/Retrieve
```

#### 5. Retrieve Funding Check
```http
GET /api/v1/PaymentInitiation/{paymentinitiationid}/FundingCheck/{fundingcheckid}/Retrieve
```

#### 6. Retrieve Order Initiation
```http
GET /api/v1/PaymentInitiation/{paymentinitiationid}/OrderInitiation/{orderinitiationid}/Retrieve
```

## Tipos de Pago Soportados

- `OTC` - Over The Counter (mostrador)
- `INTRA_ACCOUNT` - Entre cuentas del mismo banco
- `DOMESTIC` - Transferencia doméstica
- `OVERSEAS` - Transferencia internacional
- `RECURRING` - Pago recurrente
- `SCHEDULED` - Pago programado

## Mecanismos de Pago

- `SWIFT` - Red SWIFT para pagos internacionales
- `ACH` - Automated Clearing House
- `SEPA` - Single Euro Payments Area
- `WIRE` - Transferencia wire
- `INTRA_ACCOUNT` - Transferencia interna
- `REAL_TIME` - Pago en tiempo real

## Estados de Transacción

1. `INITIATED` - Iniciado
2. `PENDING` - Pendiente de procesamiento
3. `COMPLIANCE_CHECK` - En revisión de cumplimiento
4. `FUNDING_CHECK` - Verificando fondos
5. `APPROVED` - Aprobado
6. `SENT` - Enviado a red de pago
7. `PROCESSING` - En procesamiento
8. `COMPLETED` - Completado exitosamente
9. `FAILED` - Fallido
10. `REJECTED` - Rechazado
11. `CANCELLED` - Cancelado

## Desarrollo

### Estructura de Comandos

```bash
# Desarrollo
npm run start:dev

# Build
npm run build

# Tests
npm run test
npm run test:watch
npm run test:cov

# Linting
npm run lint
npm run format

# Migrations
npm run typeorm migration:generate -- -n MigrationName
npm run typeorm migration:run
npm run typeorm migration:revert
```

## Configuración de Supabase

### 1. Crear proyecto en Supabase
1. Ir a https://supabase.com
2. Crear nuevo proyecto
3. Copiar credenciales (URL, anon key, DB password)

### 2. Habilitar extensión UUID
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 3. Ejecutar migraciones
Las migraciones se ejecutarán automáticamente con `npm run migration:run`

## Licencia

MIT License

## Referencias

- [BIAN Service Landscape](https://bian.org/servicelandscape/)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Supabase Documentation](https://supabase.com/docs)
