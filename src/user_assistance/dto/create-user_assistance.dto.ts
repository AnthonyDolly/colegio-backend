import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateAssistanceDto } from './create-assistance.dto';

export class CreateUserAssistanceDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssistanceDto)
  assistances: CreateAssistanceDto[];
}
