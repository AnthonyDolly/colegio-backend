import { PartialType } from '@nestjs/mapped-types';
import { CreateRequesttypeDto } from './create-requesttype.dto';

export class UpdateRequesttypeDto extends PartialType(CreateRequesttypeDto) {}
