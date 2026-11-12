import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentsModule, {
    transport: Transport.TCP,
  });

  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>('PAYMENTS_PORT'));

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PAYMENTS_PORT must be a valid TCP port.');
  }

  await app.listen(port);
}

bootstrap();
