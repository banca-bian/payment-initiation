import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const apiPrefix = configService.get<string>('app.apiPrefix', 'api/v1');

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable CORS
  app.enableCors();

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Payment Initiation Service')
    .setDescription(
      'BIAN Payment Initiation Service Domain - Microservice with Hexagonal Architecture',
    )
    .setVersion('1.0.0')
    .setContact('BIAN', 'https://bian.org', '')
    .addTag('Payment Initiation', 'Payment transaction initiation and management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║   Payment Initiation Microservice (BIAN)                     ║
  ║   Hexagonal Architecture                                      ║
  ║                                                               ║
  ║   🚀 Server running on: http://localhost:${port}                 ║
  ║   📚 API Documentation: http://localhost:${port}/api/docs        ║
  ║   🔧 Environment: ${configService.get('app.nodeEnv')}                      ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
