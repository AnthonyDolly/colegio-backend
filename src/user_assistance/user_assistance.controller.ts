import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserAssistanceService } from './user_assistance.service';
import { CreateUserAssistanceDto } from './dto/create-user_assistance.dto';
import { UpdateUserAssistanceDto } from './dto/update-user_assistance.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../users/entities/user.entity';
import { RegisterAssistanceDto } from './dto/register_assistance.dto';
import { FilterUserAssistanceDto } from './dto/filter-user_assistance.dto';

@Controller('user-assistance')
export class UserAssistanceController {
  constructor(private readonly userAssistanceService: UserAssistanceService) {}

  @Post()
  create(@Body() createUserAssistanceDto: CreateUserAssistanceDto) {
    return this.userAssistanceService.create(createUserAssistanceDto);
  }

  @Get()
  findAll(@Query() filterUserAssistanceDto?: FilterUserAssistanceDto) {
    return this.userAssistanceService.findAll(filterUserAssistanceDto);
  }

  @Get(':userId')
  findOne(@Param('userId', ValidateMongoIdPipe) userId: string) {
    return this.userAssistanceService.findOne(userId);
  }

  @Post(':userId')
  @Auth(ValidRoles.ADMINISTRADOR)
  registerUserAssistance(
    @Param('userId', ValidateMongoIdPipe) userId: string,
    @GetUser() user: User,
    @Body() registerAssistanceDto?: RegisterAssistanceDto,
  ) {
    return this.userAssistanceService.registerUserAssistance(
      userId,
      user,
      registerAssistanceDto,
    );
  }

  @Patch('assistance/:assistanceId')
  @Auth(ValidRoles.ADMINISTRADOR)
  registerUserCheckOutTime(
    @Param('assistanceId', ValidateMongoIdPipe) assistanceId: string,
    @GetUser() user: User,
  ) {
    return this.userAssistanceService.registerUserCheckOutTime(
      assistanceId,
      user,
    );
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
