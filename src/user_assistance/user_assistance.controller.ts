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

  @Get(':userId')
  findOne(@Param('userId', ValidateMongoIdPipe) userId: string) {
    return this.userAssistanceService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId', ValidateMongoIdPipe) userId: string,
    @Body() updateUserAssistanceDto: UpdateUserAssistanceDto,
  ) {
    return this.userAssistanceService.update(userId, updateUserAssistanceDto);
  }

  @Delete(':userId')
  remove(@Param('userId', ValidateMongoIdPipe) userId: string) {
    return this.userAssistanceService.remove(userId);
  }

  @Get('report/:month')
  getReportByMonth(@Param('month') month: number) {
    return this.userAssistanceService.getReportByMonth(month);
  }

  @Get('report/month/:month/user/:id')
  getReportByMonthAndUser(
    @Param('month') month: number,
    @Param('id', ValidateMongoIdPipe) id: string,
  ) {
    return this.userAssistanceService.getReportByMonthAndUser(month, id);
  }
}
