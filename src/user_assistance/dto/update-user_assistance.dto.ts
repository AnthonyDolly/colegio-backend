import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAssistanceDto } from './create-user_assistance.dto';

export class UpdateUserAssistanceDto extends PartialType(CreateUserAssistanceDto) {}
