import {
  IsArray,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class AssistanceStatus {
  @IsOptional()
  @IsMongoId()
  status?: string;
}

export class RegisterAssistanceDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  assistances?: AssistanceStatus[];
}
