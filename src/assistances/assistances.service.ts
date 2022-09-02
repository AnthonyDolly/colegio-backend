import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';
import { Assistance } from './entities/assistance.entity';

@Injectable()
export class AssistancesService {
  constructor(
    @InjectModel(Assistance.name) private assistanceModel: Model<Assistance>,
  ) {}

  async create(createAssistanceDto: CreateAssistanceDto) {
    try {
      return await this.assistanceModel.create(createAssistanceDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const assistances = await this.assistanceModel.find();
    const finalAssistances = [];

    assistances.map((assistance) => {
      finalAssistances.push({
        id: assistance._id,
        day: assistance.day.toLocaleDateString(),
      });
    });

    return finalAssistances;
  }

  async findOne(id: string) {
    const assistance = await this.assistanceModel.findById(id);
    if (!assistance) {
      throw new BadRequestException(`Assistance with id ${id} not found`);
    }
    return assistance;
  }

  async update(id: string, updateAssistanceDto: UpdateAssistanceDto) {
    await this.findOne(id);
    try {
      return await this.assistanceModel.findByIdAndUpdate(
        id,
        updateAssistanceDto,
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.assistanceModel.findByIdAndDelete(id);
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
