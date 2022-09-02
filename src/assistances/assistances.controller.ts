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
import { AssistancesService } from './assistances.service';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';

@Controller('assistances')
export class AssistancesController {
  constructor(private readonly assistancesService: AssistancesService) {}

  @Post()
  create(@Body() createAssistanceDto: CreateAssistanceDto) {
    return this.assistancesService.create(createAssistanceDto);
  }

  @Get()
  findAll() {
    return this.assistancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.assistancesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateAssistanceDto: UpdateAssistanceDto,
  ) {
    return this.assistancesService.update(id, updateAssistanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.assistancesService.remove(id);
  }
}
