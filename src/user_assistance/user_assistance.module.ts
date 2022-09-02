import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserAssistanceService } from './user_assistance.service';
import { UserAssistanceController } from './user_assistance.controller';
import {
  UserAssistance,
  UserAssistanceSchema,
} from './entities/user_assistance.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: UserAssistance.name,
        schema: UserAssistanceSchema,
      },
    ]),
  ],
  controllers: [UserAssistanceController],
  providers: [UserAssistanceService],
})
export class UserAssistanceModule {}
