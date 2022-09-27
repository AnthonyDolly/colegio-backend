import { Schema } from '@nestjs/mongoose';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@Schema()
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsMongoId()
  documentType: string;

  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsPhoneNumber('PE')
  phone?: string;

  @IsOptional()
  @IsString()
  landline?: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
