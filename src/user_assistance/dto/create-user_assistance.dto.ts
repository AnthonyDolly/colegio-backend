import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateUserAssistanceDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsDate()
  day: Date;

  @IsNotEmpty()
  @IsMongoId()
  status: string;
}
