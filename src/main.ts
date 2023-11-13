import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonExceptionHandler } from './common/exception/common-exception-handler';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CommonExceptionHandler());
  await app.listen(3000);
}

bootstrap();
