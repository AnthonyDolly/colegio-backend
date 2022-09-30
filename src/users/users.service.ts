import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAssistanceService } from './../user_assistance/user_assistance.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ValidRoles } from './../auth/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userAssistanceService: UserAssistanceService,
  ) {}

  async getUserRoles() {
    return Object.values(ValidRoles);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      console.log(createUserDto.role);
      if (createUserDto.role !== ValidRoles.ADMINISTRADOR) {
        createUserDto.password = null;
      } else {
        createUserDto.password = await bcrypt.hash(password, 10);
      }
      const user = await this.userModel.create({
        ...userData,
        password: createUserDto.password,
      });
      await this.userAssistanceService.create({
        user: user._id.toString(),
        assistances: [],
      });
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.userModel
      .find()
      .populate({ path: 'documentType role', select: 'name -_id' });
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userModel.findByIdAndDelete(id);
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
