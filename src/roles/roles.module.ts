import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from './entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [MongooseModule],
})
export class RolesModule {}
