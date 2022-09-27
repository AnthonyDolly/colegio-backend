import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserAssistanceService } from './user_assistance.service';
import { UserAssistanceController } from './user_assistance.controller';
import {
  UserAssistance,
  UserAssistanceSchema,
} from './entities/user_assistance.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: UserAssistance.name,
        schema: UserAssistanceSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [UserAssistanceController],
  providers: [UserAssistanceService],
  exports: [MongooseModule, UserAssistanceService],
})
export class UserAssistanceModule {}
