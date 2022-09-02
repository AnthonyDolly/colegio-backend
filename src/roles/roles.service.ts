import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    private readonly configService: ConfigService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    createRoleDto.name = createRoleDto.name.toLowerCase();

    try {
      return await this.roleModel.create(createRoleDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.roleModel.find();
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new BadRequestException(`Role with id ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    updateRoleDto.name = updateRoleDto.name.toLowerCase();
    try {
      return await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.roleModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(
        `Role already exists in the database ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Check Server logs`);
  }
}
