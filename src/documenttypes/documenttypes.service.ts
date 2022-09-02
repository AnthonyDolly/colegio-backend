import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumenttypeDto } from './dto/create-documenttype.dto';
import { UpdateDocumenttypeDto } from './dto/update-documenttype.dto';
import { Documenttype } from './entities/documenttype.entity';

@Injectable()
export class DocumenttypesService {
  constructor(
    @InjectModel(Documenttype.name)
    private readonly documenttypeModel: Model<Documenttype>,
  ) {}

  async create(createDocumenttypeDto: CreateDocumenttypeDto) {
    try {
      return await this.documenttypeModel.create(createDocumenttypeDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.documenttypeModel.find();
  }

  async findOne(id: string) {
    const documenttype = await this.documenttypeModel.findById(id);
    if (!documenttype) {
      throw new BadRequestException(`Documenttype with id ${id} not found`);
    }
    return documenttype;
  }

  async update(id: string, updateDocumenttypeDto: UpdateDocumenttypeDto) {
    await this.findOne(id);
    try {
      return await this.documenttypeModel.findByIdAndUpdate(
        id,
        updateDocumenttypeDto,
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.documenttypeModel.findByIdAndDelete(id);
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
