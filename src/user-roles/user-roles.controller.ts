import { Controller, Get, Param } from '@nestjs/common';
import { ValidRoles } from './../auth/interfaces';
import { Auth } from './../auth/decorators';
import { UserRolesService } from './user-roles.service';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.userRolesService.findOne(id);
  }
}
