import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  requestType: string;

  @IsDate()
  @IsNotEmpty()
  day: Date;

  @IsMongoId()
  @IsNotEmpty()
  reviewedBy: string;
}
