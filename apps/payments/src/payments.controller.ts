import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('payments.ping')
  getHello(): string {
    return this.paymentsService.getHello();
  }
}
