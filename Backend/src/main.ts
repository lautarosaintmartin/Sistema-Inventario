import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //permitir el trafico de datos del front al back
  app.enableCors('*');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const result = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints ?? {})[0]
          return acc
        }, {} as Record<string, string>)
        return new BadRequestException(result)
      }
    })
  )
  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`App corriendo en el puerto: ${await app.getUrl()}`)
}
bootstrap();