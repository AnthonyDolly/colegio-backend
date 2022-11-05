import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RequesttypesService } from './requesttypes.service';
import { RequesttypesController } from './requesttypes.controller';
import { Requesttype, RequesttypeSchema } from './entities/requesttype.entity';
import { RequestsModule } from './../requests/requests.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Requesttype.name,
        schema: RequesttypeSchema,
      },
    ]),
    RequestsModule,
  ],
  controllers: [RequesttypesController],
  providers: [RequesttypesService],
  exports: [MongooseModule, RequesttypesService],
})
export class RequesttypesModule {}
