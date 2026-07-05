
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-password');
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async getUserStats(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      email: user.email,
      status: user.status,
      tokenBalance: user.tokenBalance,
      totalGenerations: user.totalGenerations,
      subscriptionEndDate: user.subscriptionEndDate,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, updates: Partial<User>) {
    return this.userModel.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
  }
}
