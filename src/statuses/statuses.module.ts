import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { Status, StatusSchema } from './entities/status.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Status.name,
        schema: StatusSchema,
      },
    ]),
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
