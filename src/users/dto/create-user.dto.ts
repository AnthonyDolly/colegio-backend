import { Schema } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ValidRoles } from './../../auth/interfaces';

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
  @IsEnum(ValidRoles, {
    message: `El rol debe ser uno de los siguientes: ${Object.values(
      ValidRoles,
    ).join(', ')}`,
  })
  role: string;
}
