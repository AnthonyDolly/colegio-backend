import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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
    return await this.requesttypeModel.find({
      code: { $nin: [2, 3] },
    });
  }

  async findOne(term: string) {
    let requesttype: Requesttype;

    if (isValidObjectId(term)) {
      requesttype = await this.requesttypeModel.findById(term);
      if (requesttype) return requesttype;
    }

    if (!isNaN(Number(term))) {
      requesttype = await this.requesttypeModel.findOne({ code: Number(term) });
      if (requesttype) return requesttype;
    }

    if (!requesttype)
      throw new NotFoundException(`requesttype with ${term} not found`);

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
