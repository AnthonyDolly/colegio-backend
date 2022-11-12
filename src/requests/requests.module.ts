import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './entities/request.entity';
import { AuthModule } from './../auth/auth.module';
import { StatusesModule } from './../statuses/statuses.module';
import { UserRolesModule } from './../user-roles/user-roles.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Request.name,
        schema: RequestSchema,
      },
    ]),
    UserRolesModule,
    StatusesModule,
    AuthModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [MongooseModule, RequestsService],
})
export class RequestsModule {}
