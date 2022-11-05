import { Module } from '@nestjs/common';
import { CheckInTimeService } from './check-in-time.service';
import { CheckInTimeController } from './check-in-time.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckInTime,
  CheckInTimeSchema,
} from './entities/check-in-time.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: CheckInTime.name,
        schema: CheckInTimeSchema,
      },
    ]),
  ],
  controllers: [CheckInTimeController],
  providers: [CheckInTimeService],
  exports: [MongooseModule, CheckInTimeService],
})
export class CheckInTimeModule {}
