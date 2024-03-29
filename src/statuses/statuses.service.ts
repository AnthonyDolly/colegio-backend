import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectModel(Status.name) private readonly statusModel: Model<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    createStatusDto.name = createStatusDto.name.toUpperCase();

    try {
      return await this.statusModel.create(createStatusDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.statusModel.find();
  }

  async findOne(term: string) {
    let status: Status;

    if (isValidObjectId(term)) {
      status = await this.statusModel.findById(term);
      if (status) return status;
    }

    if (!isNaN(Number(term))) {
      status = await this.statusModel.findOne({ code: Number(term) });
      if (status) return status;
    }

    if (!status) throw new NotFoundException(`Status with ${term} not found`);

    return status;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    await this.findOne(id);
    updateStatusDto.name = updateStatusDto.name.toUpperCase();
    try {
      return await this.statusModel.findByIdAndUpdate(id, updateStatusDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.statusModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(
        `Status already exists in the database ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Check Server logs`);
  }
}
