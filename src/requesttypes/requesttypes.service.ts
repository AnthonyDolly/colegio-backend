import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequesttypeDto } from './dto/create-requesttype.dto';
import { UpdateRequesttypeDto } from './dto/update-requesttype.dto';
import { Requesttype } from './entities/requesttype.entity';

@Injectable()
export class RequesttypesService {
  constructor(
    @InjectModel(Requesttype.name)
    private readonly requesttypeModel: Model<Requesttype>,
  ) {}

  async create(createRequesttypeDto: CreateRequesttypeDto) {
    try {
      return await this.requesttypeModel.create(createRequesttypeDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.requesttypeModel.find();
  }

  async findOne(id: string) {
    const requesttype = await this.requesttypeModel.findById(id);
    if (!requesttype) {
      throw new BadRequestException(`Requesttype with id ${id} not found`);
    }
    return requesttype;
  }

  async update(id: string, updateRequesttypeDto: UpdateRequesttypeDto) {
    await this.findOne(id);
    try {
      return await this.requesttypeModel.findByIdAndUpdate(
        id,
        updateRequesttypeDto,
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.requesttypeModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(
        `Documenttype already exists in the database ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Check Server logs`);
  }
}
