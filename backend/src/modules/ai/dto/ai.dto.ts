
import { IsString, IsOptional, IsIn, MaxLength } from 'class-validator';

export class GenerateContentDto {
  @IsString()
  templateId: string;

  @IsString()
  @MaxLength(2000)
  prompt: string;

  @IsString()
  @IsOptional()
  @IsIn(['openai', 'gemini'])
  aiProvider?: 'openai' | 'gemini' = 'openai';
}

export class AiProviderDto {
  @IsString()
  @IsIn(['openai', 'gemini'])
  provider: 'openai' | 'gemini';
}
