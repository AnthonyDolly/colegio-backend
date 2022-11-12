import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class FilterRequestDto {
  @IsInt()
  @IsOptional()
  month?: number;

  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsMongoId()
  @IsOptional()
  status?: string;
}
