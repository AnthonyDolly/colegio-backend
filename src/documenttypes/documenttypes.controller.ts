import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';
import { DocumenttypesService } from './documenttypes.service';
import { CreateDocumenttypeDto } from './dto/create-documenttype.dto';
import { UpdateDocumenttypeDto } from './dto/update-documenttype.dto';

@Controller('documenttypes')
export class DocumenttypesController {
  constructor(private readonly documenttypesService: DocumenttypesService) {}

  @Post()
  create(@Body() createDocumenttypeDto: CreateDocumenttypeDto) {
    return this.documenttypesService.create(createDocumenttypeDto);
  }

  @Get()
  findAll() {
    return this.documenttypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.documenttypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateDocumenttypeDto: UpdateDocumenttypeDto,
  ) {
    return this.documenttypesService.update(id, updateDocumenttypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.documenttypesService.remove(id);
  }
}
