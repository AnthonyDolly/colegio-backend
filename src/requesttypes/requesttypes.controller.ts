import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequesttypesService } from './requesttypes.service';
import { CreateRequesttypeDto } from './dto/create-requesttype.dto';
import { UpdateRequesttypeDto } from './dto/update-requesttype.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';

@Controller('requesttypes')
export class RequesttypesController {
  constructor(private readonly requesttypesService: RequesttypesService) {}

  @Post()
  create(@Body() createRequesttypeDto: CreateRequesttypeDto) {
    return this.requesttypesService.create(createRequesttypeDto);
  }

  @Get()
  findAll() {
    return this.requesttypesService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.requesttypesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateRequesttypeDto: UpdateRequesttypeDto,
  ) {
    return this.requesttypesService.update(id, updateRequesttypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.requesttypesService.remove(id);
  }
}
