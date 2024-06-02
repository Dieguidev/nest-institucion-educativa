import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir solicitudes desde Vercel, localhost y orígenes nulos (Postman)
      if (!origin || origin === 'https://mi-campus.vercel.app' || /localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // https://mi-campus.vercel.app/

  await app.listen(envs.port);

  logger.log(`API is running on port ${envs.port}`)
}
bootstrap();
