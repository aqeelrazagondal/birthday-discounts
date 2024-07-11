import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from '../config/config.development';
require('dotenv').config();
// import * as csurf from 'csurf';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // The ValidationPipe is a built-in pipe provided by NestJS that uses the class-validator package to automatically validate incoming requests.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // The csurf middleware is used to prevent CSRF attacks by adding a CSRF token to all incoming requests.
  // app.use(csurf());

  // The compression middleware is used to compress the response body of all incoming requests.
  app.use(compression());

  // The DocumentBuilder class is used to create a new Swagger document.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Birthday Campaign API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth({
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer', // I've tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'http', // I've attempted a type: 'apiKey' too
      in: 'Header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // The enableCors method is used to enable CORS for the application.
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // The listen method is used to start the application on the specified port.
  await app.listen(config.port || 3000);
}
bootstrap();
