import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documenttype } from './../documenttypes/entities/documenttype.entity';
import { Status } from './../statuses/entities/status.entity';
import { Role } from './../roles/entities/role.entity';
import { ROLE_SEED } from './data/role.seed';
import { DOCUMENTTYPE_SEED } from './data/documenttype.seed';
import { STATUS_SEED } from './data/status.seed';
import { Requesttype } from './../requesttypes/entities/requesttype.entity';
import { REQUESTTYPE_SEED } from './data/requesttype.seed';
import { User } from './../users/entities/user.entity';
import { UserAssistance } from './../user_assistance/entities/user_assistance.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Documenttype.name)
    private documenttypeModel: Model<Documenttype>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    @InjectModel(Requesttype.name) private requesttypeModel: Model<Requesttype>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserAssistance.name)
    private userAssistanceModel: Model<UserAssistance>,
  ) {}

  async executeSeed() {
    await this.roleModel.deleteMany({});
    await this.documenttypeModel.deleteMany({});
    await this.statusModel.deleteMany({});
    await this.requesttypeModel.deleteMany({});
    await this.userAssistanceModel.deleteMany({});
    await this.userModel.deleteMany({});

    await this.roleModel.create(ROLE_SEED);
    await this.documenttypeModel.create(DOCUMENTTYPE_SEED);
    await this.statusModel.create(STATUS_SEED);
    await this.requesttypeModel.create(REQUESTTYPE_SEED);

    return 'Seed executed successfully';
  }
}
