
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class TokenService {
  private readonly TOKEN_RENEWAL_AMOUNT = 10;
  private readonly TOKEN_RENEWAL_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getBalance(userId: string): Promise<number> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user.tokenBalance;
  }

  async deductTokens(userId: string, amount: number): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.tokenBalance < amount) {
      return false;
    }

    await this.userModel.findByIdAndUpdate(userId, {
      $inc: { tokenBalance: -amount },
    });

    return true;
  }

  async refundTokens(userId: string, amount: number): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $inc: { tokenBalance: amount },
    });
  }

  async addTokens(userId: string, amount: number): Promise<number> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $inc: { tokenBalance: amount } },
      { new: true },
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user.tokenBalance;
  }

  async renewDailyTokens(): Promise<void> {
    await this.userModel.updateMany(
      {
        status: 'free',
        tokenBalance: { $lt: 10 },
      },
      {
        $inc: { tokenBalance: this.TOKEN_RENEWAL_AMOUNT },
      },
    );
  }
}
