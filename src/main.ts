import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  // Config prefix global route basic
  app.setGlobalPrefix('api');

  // Config global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Teslo RESTFul API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    .addTag('tesla-shop')
    .setContact(
      'Victor Hugo Aguilar',
      'victorhugoaguilar.com',
      'contacto@victorhugoaguilar.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('V1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT_API);
  logger.log(`App running in port ${process.env.PORT_API}`);
}
bootstrap();
