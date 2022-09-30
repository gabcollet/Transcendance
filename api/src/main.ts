const { Pool, Client } = require('pg');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //* Strips value in the body that are not present in the Entity model
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  }); //* Cross Origin Ressource Sharing. Enables our app to retrieve tokens from the OAuth2 server
  await app.listen(3030, () => {
    logger.log('API IS RUNNING');
  });
}
bootstrap();
