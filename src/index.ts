// bootstrap nestjs
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: ['Location', 'Content-Lenght', 'Content-Range'],
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Library example')
    .setDescription('The libary API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  Logger.log('Server running on http://localhost:3000', 'Bootstrap');
}
bootstrap();
