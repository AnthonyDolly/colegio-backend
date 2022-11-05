import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCheckInTimeDto {
  @IsString()
  @IsNotEmpty()
  hour: string;
}
