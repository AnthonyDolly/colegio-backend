import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequesttypeDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
