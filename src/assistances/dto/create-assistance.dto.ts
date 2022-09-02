import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAssistanceDto {
  @IsNotEmpty()
  @IsDateString()
  day: string;
}
