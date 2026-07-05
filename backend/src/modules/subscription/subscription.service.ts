
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { User, UserDocument } from '../users/schemas/user.schema';

interface PlanDetails {
  name: string;
  price: number;
  tokens: number;
  features: string[];
}

const PLANS: Record<string, PlanDetails> = {
  starter: {
    name: 'Starter',
    price: 29,
    tokens: 100,
    features: ['100 tokens/month', 'Basic templates', 'Email support'],
  },
  pro: {
    name: 'Pro',
    price: 79,
    tokens: 500,
    features: ['500 tokens/month', 'All templates', 'Priority support', 'API access'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 199,
    tokens: 2000,
    features: ['2000 tokens/month', 'Custom templates', 'Dedicated support', 'Team access', 'White-label'],
  },
};

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') || '',
      { apiVersion: '2023-10-16' as any },
    );
  }

  getPlans(): PlanDetails[] {
    return Object.entries(PLANS).map(([id, plan]) => ({ ...plan, id }));
  }

  getPlan(planId: string): PlanDetails | undefined {
    return PLANS[planId];
  }

  async createCheckoutSession(
    userId: string,
    planId: string,
  ): Promise<{ sessionId: string; url: string }> {
    const plan = this.getPlan(planId);
    if (!plan) {
      throw new Error('Invalid plan');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `AI SaaS ${plan.name} Plan`,
              description: plan.features.join(', '),
            },
            unit_amount: plan.price * 100,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        planId,
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?success=true`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/pricing?canceled=true`,
    });

    return {
      sessionId: session.id,
      url: session.url || '',
    };
  }

  async handleWebhook(
    payload: Buffer,
    signature: string,
  ): Promise<{ success: boolean; message: string }> {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret || '',
      );

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const { userId, planId } = session.metadata || {};
          
          if (userId && planId) {
            const plan = this.getPlan(planId);
            await this.userModel.findByIdAndUpdate(userId, {
              status: planId === 'starter' ? 'free' : 'pro',
              stripeCustomerId: session.customer,
              subscriptionId: session.subscription,
              tokenBalance: plan?.tokens || 0,
              subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });
          }
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const user = await this.userModel.findOne({
            stripeCustomerId: subscription.customer,
          });
          
          if (user) {
            const newStatus = subscription.status === 'active' ? 'pro' : 'free';
            await this.userModel.findByIdAndUpdate(user._id, {
              status: newStatus,
              subscriptionEndDate: new Date(subscription.current_period_end * 1000),
            });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          const user = await this.userModel.findOne({
            stripeCustomerId: subscription.customer,
          });
          
          if (user) {
            await this.userModel.findByIdAndUpdate(user._id, {
              status: 'free',
              subscriptionId: null,
              tokenBalance: 10,
            });
          }
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          const user = await this.userModel.findOne({
            stripeCustomerId: invoice.customer,
          });
          
          if (user) {
            await this.userModel.findByIdAndUpdate(user._id, {
              status: 'free',
            });
          }
          break;
        }
      }

      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async cancelSubscription(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.subscriptionId) {
      throw new Error('No active subscription found');
    }

    await this.stripe.subscriptions.cancel(user.subscriptionId);
    
    await this.userModel.findByIdAndUpdate(userId, {
      status: 'free',
      subscriptionId: null,
      tokenBalance: 10,
    });
  }

  async getSubscriptionStatus(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      status: user.status,
      hasSubscription: !!user.subscriptionId,
      subscriptionEndDate: user.subscriptionEndDate,
      tokenBalance: user.tokenBalance,
    };
  }
}
