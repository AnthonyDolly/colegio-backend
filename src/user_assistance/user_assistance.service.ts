import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserAssistanceDto } from './dto/create-user_assistance.dto';
import { UpdateUserAssistanceDto } from './dto/update-user_assistance.dto';
import { UserAssistance } from './entities/user_assistance.entity';

@Injectable()
export class UserAssistanceService {
  constructor(
    @InjectModel(UserAssistance.name)
    private readonly userAssistanceModel: Model<UserAssistance>,
  ) {}

  async create(createUserAssistanceDto: CreateUserAssistanceDto) {
    try {
      return await this.userAssistanceModel.create(createUserAssistanceDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.userAssistanceModel
      .find({}, { __v: 0 })
      .populate({ path: 'user status', select: 'name -_id' });
  }

  async findOne(id: string) {
    const userAssistance = await this.userAssistanceModel
      .findById({ _id: id }, { __v: 0 })
      .populate({ path: 'user status', select: 'name -_id' });
    if (!userAssistance) {
      throw new BadRequestException(`UserAssistance with id ${id} not found`);
    }
    return userAssistance;
  }

  async update(id: string, updateUserAssistanceDto: UpdateUserAssistanceDto) {
    await this.findOne(id);
    try {
      return await this.userAssistanceModel.findByIdAndUpdate(
        id,
        updateUserAssistanceDto,
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userAssistanceModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(
        `User already exists in the database ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Check Server logs`);
  }
}
