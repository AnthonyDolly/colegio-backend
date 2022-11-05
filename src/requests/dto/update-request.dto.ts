import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  status: string;
}
