import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCheckInTimeDto } from './dto/update-check-in-time.dto';
import { CheckInTime } from './entities/check-in-time.entity';

@Injectable()
export class CheckInTimeService {
  constructor(
    @InjectModel(CheckInTime.name)
    private readonly checkInTimeModel: Model<CheckInTime>,
  ) {}

  async findAll() {
    return await this.checkInTimeModel.findOne();
  }

  async update(id: string, updateCheckInTimeDto: UpdateCheckInTimeDto) {
    return await this.checkInTimeModel.findByIdAndUpdate(
      id,
      updateCheckInTimeDto,
    );
  }
}
