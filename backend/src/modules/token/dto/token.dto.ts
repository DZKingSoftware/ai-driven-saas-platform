
import { IsNumber, Min } from 'class-validator';

export class AddTokensDto {
  @IsNumber()
  @Min(1)
  amount: number;
}
