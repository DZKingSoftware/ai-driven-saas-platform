
import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  RawBodyRequest,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCheckoutDto } from './dto/subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('plans')
  getPlans() {
    return this.subscriptionService.getPlans();
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async createCheckout(@Request() req, @Body() dto: CreateCheckoutDto) {
    return this.subscriptionService.createCheckoutSession(
      req.user._id.toString(),
      dto.planId,
    );
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() payload: any,
  ) {
    return this.subscriptionService.handleWebhook(
      Buffer.from(JSON.stringify(payload)),
      signature,
    );
  }

  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  async cancelSubscription(@Request() req) {
    await this.subscriptionService.cancelSubscription(req.user._id.toString());
    return { message: 'Subscription canceled successfully' };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@Request() req) {
    return this.subscriptionService.getSubscriptionStatus(req.user._id.toString());
  }
}
