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
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';
import { Auth, GetUser } from './../auth/decorators';
import { ValidRoles } from './../auth/interfaces';
import { User } from './../users/entities/user.entity';
import { FilterRequestDto } from './dto/filter-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Auth(
    ValidRoles.ADMINISTRADOR,
    ValidRoles.DIRECTOR,
    ValidRoles.PROFESOR,
    ValidRoles.AUXILIAR,
  )
  create(@Body() createRequestDto: CreateRequestDto, @GetUser() user: User) {
    return this.requestsService.create(createRequestDto, user);
  }

  @Get()
  @Auth(
    ValidRoles.ADMINISTRADOR,
    ValidRoles.DIRECTOR,
    ValidRoles.PROFESOR,
    ValidRoles.AUXILIAR,
  )
  findAll(@Query() filterRequestDto: FilterRequestDto, @GetUser() user: User) {
    return this.requestsService.findAll(filterRequestDto, user);
  }

  @Get(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @GetUser() user: User,
  ) {
    return this.requestsService.update(id, updateRequestDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.requestsService.remove(id);
  }
}
