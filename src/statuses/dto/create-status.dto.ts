import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
