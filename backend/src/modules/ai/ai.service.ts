
import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Generation, GenerationDocument } from './schemas/generation.schema';
import { TokenService } from '../token/token.service';
import { GenerateContentDto } from './dto/ai.dto';

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  systemPrompt: string;
  tokensCost: number;
  proOnly: boolean;
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'seo-blog',
    name: 'SEO Blog Post',
    category: 'Content',
    description: 'Generate SEO-optimized blog post',
    systemPrompt: 'You are an expert SEO content writer. Create a comprehensive, SEO-optimized blog post with proper heading structure, meta description, and keyword integration.',
    tokensCost: 500,
    proOnly: false,
  },
  {
    id: 'social-media',
    name: 'Social Media Content',
    category: 'Marketing',
    description: 'Create engaging social media posts',
    systemPrompt: 'You are a social media expert. Create engaging, viral-worthy social media posts with relevant hashtags and emojis.',
    tokensCost: 300,
    proOnly: false,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    category: 'Marketing',
    description: 'Write high-converting email sequences',
    systemPrompt: 'You are an expert email copywriter. Create compelling, conversion-focused email sequences that drive action.',
    tokensCost: 400,
    proOnly: false,
  },
  {
    id: 'product-description',
    name: 'Product Description',
    category: 'E-commerce',
    description: 'Write persuasive product descriptions',
    systemPrompt: 'You are an expert e-commerce copywriter. Create persuasive, benefit-driven product descriptions that convert browsers into buyers.',
    tokensCost: 350,
    proOnly: true,
  },
  {
    id: 'video-script',
    name: 'Video Script',
    category: 'Video',
    description: 'Create engaging video scripts',
    systemPrompt: 'You are an expert video scriptwriter. Create engaging, attention-grabbing video scripts with hooks, body, and calls-to-action.',
    tokensCost: 600,
    proOnly: true,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis Report',
    category: 'Analytics',
    description: 'Analyze data and generate insights',
    systemPrompt: 'You are a data analyst expert. Analyze the provided data and generate comprehensive insights with actionable recommendations.',
    tokensCost: 800,
    proOnly: true,
  },
];

@Injectable()
export class AiService {
  private openai: OpenAI;
  private gemini: GoogleGenerativeAI;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Generation.name) private generationModel: Model<GenerationDocument>,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });

    this.gemini = new GoogleGenerativeAI(
      this.configService.get('GEMINI_API_KEY') || '',
    );
  }

  getTemplates(): PromptTemplate[] {
    return PROMPT_TEMPLATES;
  }

  getTemplateById(id: string): PromptTemplate | undefined {
    return PROMPT_TEMPLATES.find((t) => t.id === id);
  }

  async generateContent(
    userId: string,
    dto: GenerateContentDto,
  ): Promise<{ result: string; tokensUsed: number; generationId: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const template = this.getTemplateById(dto.templateId);
    if (!template) {
      throw new BadRequestException('Invalid template');
    }

    if (template.proOnly && user.status === 'free') {
      throw new ForbiddenException('This template requires PRO subscription');
    }

    const hasEnoughTokens = await this.tokenService.deductTokens(
      userId,
      template.tokensCost,
    );
    if (!hasEnoughTokens) {
      throw new BadRequestException(
        'Insufficient tokens. Please upgrade your plan or wait for token renewal.',
      );
    }

    try {
      let result: string;
      let model: string;
      let tokensUsed: number;

      if (dto.aiProvider === 'gemini') {
        const geminiResult = await this.generateWithGemini(
          template.systemPrompt,
          dto.prompt,
        );
        result = geminiResult.text;
        model = 'gemini-pro';
        tokensUsed = template.tokensCost;
      } else {
        const openaiResult = await this.generateWithOpenAI(
          template.systemPrompt,
          dto.prompt,
        );
        result = openaiResult.text;
        model = 'gpt-4';
        tokensUsed = template.tokensCost;
      }

      const generation = new this.generationModel({
        userId: new Types.ObjectId(userId),
        template: template.id,
        prompt: dto.prompt,
        result: { text: result, model, tokensUsed },
        tokensUsed,
        status: 'success',
      });

      await generation.save();
      await this.userModel.findByIdAndUpdate(userId, {
        $inc: { totalGenerations: 1 },
      });

      return {
        result,
        tokensUsed,
        generationId: generation._id.toString(),
      };
    } catch (error) {
      await this.tokenService.refundTokens(userId, template.tokensCost);
      throw new BadRequestException(
        `Generation failed: ${error.message}`,
      );
    }
  }

  private async generateWithOpenAI(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<{ text: string; usage: any }> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return {
      text: completion.choices[0].message.content,
      usage: completion.usage,
    };
  }

  private async generateWithGemini(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<{ text: string }> {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${userPrompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    
    return { text: response.text() };
  }

  async getUserGenerations(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const generations = await this.generationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.generationModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    return {
      data: generations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getGenerationById(userId: string, generationId: string) {
    return this.generationModel.findOne({
      _id: new Types.ObjectId(generationId),
      userId: new Types.ObjectId(userId),
    });
  }
}
