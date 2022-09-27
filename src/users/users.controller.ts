import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';
import { Auth } from '..//auth/decorators';
import { ValidRoles } from '..//auth/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidRoles.ADMINISTRADOR)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.ADMINISTRADOR)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
