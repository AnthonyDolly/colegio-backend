import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../users/entities/user.entity';
import { ValidRoles } from './../auth/interfaces';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return Object.values(ValidRoles);
  }

  async findOne(id: string) {
    const userRole = await this.userModel.findById(id);
    if (!userRole) {
      throw new BadRequestException(`User role with id ${id} not found`);
    }
    return userRole;
  }
}
