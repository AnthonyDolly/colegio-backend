import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documenttype } from './../documenttypes/entities/documenttype.entity';
import { Status } from './../statuses/entities/status.entity';
import { DOCUMENTTYPE_SEED } from './data/documenttype.seed';
import { STATUS_SEED } from './data/status.seed';
import { Requesttype } from './../requesttypes/entities/requesttype.entity';
import { REQUESTTYPE_SEED } from './data/requesttype.seed';
import { User } from './../users/entities/user.entity';
import { UserAssistance } from './../user_assistance/entities/user_assistance.entity';
import { Request } from './../requests/entities/request.entity';
import { CheckInTime } from './../check-in-time/entities/check-in-time.entity';
import { CHECKINTIME_SEED } from './data/check-in-time.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Documenttype.name)
    private documenttypeModel: Model<Documenttype>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    @InjectModel(Requesttype.name) private requesttypeModel: Model<Requesttype>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserAssistance.name)
    private userAssistanceModel: Model<UserAssistance>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(CheckInTime.name)
    private readonly checkInTimeModel: Model<CheckInTime>,
  ) {}

  async executeSeed() {
    await this.documenttypeModel.deleteMany({});
    await this.statusModel.deleteMany({});
    await this.requesttypeModel.deleteMany({});
    await this.userAssistanceModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.requestModel.deleteMany({});
    await this.checkInTimeModel.deleteMany({});

    await this.documenttypeModel.create(DOCUMENTTYPE_SEED);
    await this.statusModel.create(STATUS_SEED);
    await this.requesttypeModel.create(REQUESTTYPE_SEED);
    await this.checkInTimeModel.create(CHECKINTIME_SEED);

    return 'Seed executed successfully';
  }
}
