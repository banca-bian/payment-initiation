# Configuración de Supabase para Payment Initiation

Esta guía te ayudará a configurar correctamente la conexión a Supabase para resolver el error "Tenant or user not found".

## Paso 1: Obtener Credenciales de Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto (o crea uno nuevo)
4. Ve a **Settings** (⚙️) → **Database**

## Paso 2: Ubicar la Información de Conexión

En la página de Database, encontrarás:

### Connection string
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxxx.supabase.co:5432/postgres
```

Esta string contiene toda la información que necesitas:

- **Host**: `db.xxxxxxxxxxxxxx.supabase.co` (sin `postgresql://` ni puerto)
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: El password que configuraste al crear el proyecto
- **Database**: `postgres`

### Connection pooling (Alternativo)
Si tienes problemas con la conexión directa, puedes usar connection pooling:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxxx.supabase.co:6543/postgres
```

Nota que el puerto es **6543** en lugar de **5432**.

## Paso 3: Configurar el Archivo .env

Edita el archivo `.env` en la raíz del proyecto:

```env
# Application Configuration
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database Configuration (Supabase PostgreSQL)
DATABASE_HOST=db.xxxxxxxxxxxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu-password-aqui
DATABASE_NAME=postgres
DATABASE_SSL=true

# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### ⚠️ IMPORTANTE

1. **NO incluyas** `postgresql://` en `DATABASE_HOST`
2. **NO incluyas** el puerto `:5432` en `DATABASE_HOST`
3. **Usa** el password exacto que configuraste en Supabase
4. **Asegúrate** de que `DATABASE_SSL=true`

### Ejemplo Correcto vs Incorrecto

❌ **INCORRECTO:**
```env
DATABASE_HOST=postgresql://postgres:password@db.abc.supabase.co:5432/postgres
```

✅ **CORRECTO:**
```env
DATABASE_HOST=db.abc.supabase.co
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu-password
DATABASE_NAME=postgres
DATABASE_SSL=true
```

## Paso 4: Restablecer Password (Si es necesario)

Si olvidaste tu password de base de datos:

1. Ve a **Settings** → **Database**
2. Busca la sección **Database password**
3. Haz clic en **Reset database password**
4. Copia el nuevo password
5. Actualiza tu archivo `.env`

## Paso 5: Habilitar Extensión UUID

Ejecuta este SQL en Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Paso 6: Probar la Conexión

Ejecuta el script de test:

```bash
npm run test:db
```

### Resultado Esperado

Si todo está configurado correctamente, verás:

```
✅ Successfully connected to the database!
✅ Test query successful!
✅ uuid-ossp extension is installed
```

### Errores Comunes

#### Error: "Tenant or user not found"
**Causa**: Credenciales incorrectas

**Solución**:
1. Verifica que `DATABASE_HOST` sea correcto
2. Verifica que `DATABASE_PASSWORD` sea exacto
3. Verifica que `DATABASE_USERNAME` sea `postgres`
4. Intenta resetear el password

#### Error: "ECONNREFUSED"
**Causa**: No se puede conectar al servidor

**Solución**:
1. Verifica tu conexión a internet
2. Verifica que el `DATABASE_HOST` sea correcto
3. Intenta usar el puerto 6543 (connection pooling)

#### Error: "SSL connection required"
**Causa**: SSL no está habilitado

**Solución**:
```env
DATABASE_SSL=true
```

## Paso 7: Ejecutar Migraciones

Una vez que la conexión funcione:

```bash
npm run migration:run
```

Esto creará todas las tablas necesarias:
- customer_relationship
- payment_transaction
- payment_instruction
- transaction_step
- transaction

## Paso 8: Iniciar el Servidor

```bash
npm run start:dev
```

## Verificación Final

El servidor debería iniciar correctamente y mostrar:

```
[Nest] Starting Nest application...
[Nest] InstanceLoader modules initialized
[Nest] NestApplication successfully started
```

## Solución Rápida

Si sigues teniendo problemas, copia y pega esta plantilla en tu `.env`:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Reemplaza XXXXX con tu Project Reference de Supabase
DATABASE_HOST=db.XXXXXXXXXXXXXXXXXXXXX.supabase.co
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
# Reemplaza con tu password de Supabase
DATABASE_PASSWORD=TU_PASSWORD_AQUI
DATABASE_NAME=postgres
DATABASE_SSL=true

# Reemplaza con tu Project Reference
SUPABASE_URL=https://XXXXXXXXXXXXXXXXXXXXX.supabase.co
# Reemplaza con tu Anon Key (en Settings > API)
SUPABASE_ANON_KEY=TU_ANON_KEY_AQUI
```

## Soporte

Si después de seguir estos pasos sigues teniendo problemas:

1. Verifica que tu proyecto de Supabase esté activo (no en pausa)
2. Verifica que tengas acceso de red al servidor
3. Intenta usar connection pooling (puerto 6543)
4. Contacta al soporte de Supabase si el problema persiste

## Recursos

- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [TypeORM PostgreSQL Docs](https://typeorm.io/data-source-options#postgres--cockroachdb-data-source-options)
