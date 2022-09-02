import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumenttypeDto } from './create-documenttype.dto';

export class UpdateDocumenttypeDto extends PartialType(CreateDocumenttypeDto) {}
