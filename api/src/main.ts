const { Pool, Client } = require('pg');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //* Strips value in the body that are not present in the Entity model
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  }); //* Cross Origin Ressource Sharing. Enables our app to retrieve tokens from the OAuth2 server
  await app.listen(3030, () => {
    console.log('API IS RUNNING');
  });
}
bootstrap();
