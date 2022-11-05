import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.statusesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusesService.update(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.statusesService.remove(id);
  }
}
