import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from './../common/common.module';
import { DocumenttypesModule } from './../documenttypes/documenttypes.module';
import { StatusesModule } from './../statuses/statuses.module';
import { UsersModule } from './../users/users.module';
import { UserAssistanceModule } from './../user_assistance/user_assistance.module';
import { RequesttypesModule } from './../requesttypes/requesttypes.module';

@Module({
  imports: [
    DocumenttypesModule,
    StatusesModule,
    RequesttypesModule,
    UserAssistanceModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
