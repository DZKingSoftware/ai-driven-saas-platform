
import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user._id.toString());
  }

  @Get('stats')
  async getStats(@Request() req) {
    return this.usersService.getUserStats(req.user._id.toString());
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updates: any) {
    return this.usersService.updateProfile(req.user._id.toString(), updates);
  }
}
