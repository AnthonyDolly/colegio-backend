import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAssistanceService } from './user_assistance.service';
import { CreateUserAssistanceDto } from './dto/create-user_assistance.dto';
import { UpdateUserAssistanceDto } from './dto/update-user_assistance.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';

@Controller('user-assistance')
export class UserAssistanceController {
  constructor(private readonly userAssistanceService: UserAssistanceService) {}

  @Post()
  create(@Body() createUserAssistanceDto: CreateUserAssistanceDto) {
    return this.userAssistanceService.create(createUserAssistanceDto);
  }

  @Get()
  findAll() {
    return this.userAssistanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.userAssistanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateUserAssistanceDto: UpdateUserAssistanceDto,
  ) {
    return this.userAssistanceService.update(id, updateUserAssistanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.userAssistanceService.remove(id);
  }
}
