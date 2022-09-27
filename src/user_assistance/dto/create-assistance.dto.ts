import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssistanceDto {
  @IsOptional()
  @IsDate()
  checkInTime: Date;

  @IsOptional()
  @IsDate()
  checkOutTime: Date;

  @IsNotEmpty()
  @IsMongoId()
  status: string;

  @IsOptional()
  @IsMongoId()
  registeredBy: string;
}
