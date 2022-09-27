import { IsMongoId, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class FilterUserAssistanceDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @IsMongoId()
  user?: string;
}
