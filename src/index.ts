// bootstrap nestjs
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: ['Location', 'Content-Lenght', 'Content-Range'],
    },
  });
  await app.listen(3000);
  Logger.log('Server running on http://localhost:3000', 'Bootstrap');
}
bootstrap();
