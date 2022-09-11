import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssistanceDto {
  @IsNotEmpty()
  @IsDate()
  day: Date;

  @IsOptional()
  @IsDate()
  checkInTime: Date;

  @IsOptional()
  @IsDate()
  checkOutTime: Date;

  @IsNotEmpty()
  @IsMongoId()
  status: string;

  @IsNotEmpty()
  @IsMongoId()
  registeredBy: string;
}
