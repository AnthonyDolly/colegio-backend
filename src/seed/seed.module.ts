import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from './../common/common.module';
import { DocumenttypesModule } from './../documenttypes/documenttypes.module';
import { StatusesModule } from './../statuses/statuses.module';
import { UsersModule } from './../users/users.module';
import { UserAssistanceModule } from './../user_assistance/user_assistance.module';
import { RequesttypesModule } from './../requesttypes/requesttypes.module';
import { RequestsModule } from './../requests/requests.module';
import { CheckInTimeModule } from './../check-in-time/check-in-time.module';

@Module({
  imports: [
    DocumenttypesModule,
    StatusesModule,
    RequestsModule,
    RequesttypesModule,
    UserAssistanceModule,
    UsersModule,
    CheckInTimeModule,
    CommonModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
