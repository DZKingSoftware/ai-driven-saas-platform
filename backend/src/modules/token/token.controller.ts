
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddTokensDto } from './dto/token.dto';

@Controller('token')
@UseGuards(JwtAuthGuard)
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get('balance')
  async getBalance(@Request() req) {
    const balance = await this.tokenService.getBalance(req.user._id.toString());
    return { balance };
  }

  @Post('add')
  async addTokens(@Request() req, @Body() dto: AddTokensDto) {
    const newBalance = await this.tokenService.addTokens(
      req.user._id.toString(),
      dto.amount,
    );
    return { balance: newBalance };
  }
}
