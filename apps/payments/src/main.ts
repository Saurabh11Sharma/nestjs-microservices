import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentsModule, {
    transport: Transport.TCP,
  });

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get<number>('PAYMENTS_PORT'));
}
bootstrap();
