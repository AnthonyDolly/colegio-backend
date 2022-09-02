import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumenttypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
