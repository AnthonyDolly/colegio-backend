import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AssistancesService } from './assistances.service';
import { AssistancesController } from './assistances.controller';
import { Assistance, AssistanceSchema } from './entities/assistance.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Assistance.name,
        schema: AssistanceSchema,
      },
    ]),
  ],
  controllers: [AssistancesController],
  providers: [AssistancesService],
})
export class AssistancesModule {}
