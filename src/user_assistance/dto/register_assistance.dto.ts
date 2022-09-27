import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class AssistanceStatus {
  @IsNotEmpty()
  @IsMongoId()
  status: string;
}

export class RegisterAssistanceDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  assistances: AssistanceStatus[];
}
