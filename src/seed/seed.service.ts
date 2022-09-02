import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documenttype } from './../documenttypes/entities/documenttype.entity';
import { Status } from './../statuses/entities/status.entity';
import { Role } from './../roles/entities/role.entity';
import { ROLE_SEED } from './data/role.seed';
import { DOCUMENTTYPE_SEED } from './data/documenttype.seed';
import { STATUS_SEED } from './data/status.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Documenttype.name)
    private documenttypeModel: Model<Documenttype>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  async executeSeed() {
    await this.roleModel.deleteMany({});
    await this.documenttypeModel.deleteMany({});
    await this.statusModel.deleteMany({});

    await this.roleModel.create(ROLE_SEED);
    await this.documenttypeModel.create(DOCUMENTTYPE_SEED);
    await this.statusModel.create(STATUS_SEED);

    return 'Seed executed successfully';
  }
}
