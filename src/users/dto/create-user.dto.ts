import { Schema } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
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
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
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
