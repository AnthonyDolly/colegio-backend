import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { DocumenttypesModule } from './documenttypes/documenttypes.module';
import { StatusesModule } from './statuses/statuses.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { UserAssistanceModule } from './user_assistance/user_assistance.module';
import { RequesttypesModule } from './requesttypes/requesttypes.module';
import { RequestsModule } from './requests/requests.module';
import { AuthModule } from './auth/auth.module';
import { CheckInTimeModule } from './check-in-time/check-in-time.module';
import { UserRolesModule } from './user-roles/user-roles.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    DocumenttypesModule,
    StatusesModule,
    UsersModule,
    SeedModule,
    UserAssistanceModule,
    RequesttypesModule,
    RequestsModule,
    AuthModule,
    CheckInTimeModule,
    UserRolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
