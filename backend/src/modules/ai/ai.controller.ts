
import { Controller, Post, Get, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GenerateContentDto, AiProviderDto } from './dto/ai.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('templates')
  getTemplates() {
    return this.aiService.getTemplates();
  }

  @Get('templates/:id')
  getTemplate(@Param('id') id: string) {
    return this.aiService.getTemplateById(id);
  }

  @Post('generate')
  async generate(@Request() req, @Body() dto: GenerateContentDto) {
    return this.aiService.generateContent(req.user._id.toString(), dto);
  }

  @Get('generations')
  async getGenerations(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.aiService.getUserGenerations(
      req.user._id.toString(),
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('generations/:id')
  async getGeneration(@Request() req, @Param('id') id: string) {
    return this.aiService.getGenerationById(req.user._id.toString(), id);
  }

  @Post('select-provider')
  selectProvider(@Body() dto: AiProviderDto) {
    return { selectedProvider: dto.provider };
  }
}
