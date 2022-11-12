import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class FilterRequestDto {
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsInt()
  @IsOptional()
  month?: number;
}
