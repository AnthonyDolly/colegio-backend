import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatusesService } from './../statuses/statuses.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { FilterRequestDto } from './dto/filter-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name)
    private readonly requestsModel: Model<Request>,
    private readonly statusesService: StatusesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createRequestDto: CreateRequestDto, user: User) {
    const status = await this.statusesService.findOne('4');

    return await this.requestsModel.create({
      user,
      ...createRequestDto,
      status,
    });
  }

  async findAll(filterRequestDto: FilterRequestDto, user: User) {
    const { month = 0, userId = null } = filterRequestDto;

    const userRole = await this.usersService.findOne(user._id);

    let requests: Request[];
    const date = new Date();

    if (userRole.role === 'Administrador') {
      if (month === 0 && userId === null) {
        requests = await this.requestsModel
          .find()
          .populate({
            path: 'user requestType status reviewedBy',
            select: 'name -_id',
          })
          .sort({ createdAt: -1 });

        if (requests) {
          requests.forEach(async (request) => {
            if (request.status['name'] === 'Aprobado') {
              if (date > request.startDate && date < request.endDate) {
                request.status = await this.statusesService.findOne('8');
                await request.save();
              } else if (date > request.endDate) {
                request.status = await this.statusesService.findOne('9');
                await request.save();
              }
            }
          });
        }
      } else if (month !== 0 && userId === null) {
        requests = await this.requestsModel
          .find({
            createdAt: {
              $gte: new Date(new Date().getFullYear(), month - 1, 1),
              $lt: new Date(new Date().getFullYear(), month, 1),
            },
          })
          .populate({
            path: 'user requestType status reviewedBy',
            select: 'name -_id',
          })
          .sort({ createdAt: -1 });

        if (requests) {
          requests.forEach(async (request) => {
            if (request.status['name'] === 'Aprobado') {
              if (date > request.startDate && date < request.endDate) {
                request.status = await this.statusesService.findOne('8');
                await request.save();
              } else if (date > request.endDate) {
                request.status = await this.statusesService.findOne('9');
                await request.save();
              }
            }
          });
        }
      } else if (month === 0 && userId !== null) {
        requests = await this.requestsModel
          .find({ user: new Types.ObjectId(userId) })
          .populate({
            path: 'user requestType status reviewedBy',
            select: 'name -_id',
          })
          .sort({ createdAt: -1 });

        if (requests) {
          requests.forEach(async (request) => {
            if (request.status['name'] === 'Aprobado') {
              if (date > request.startDate && date < request.endDate) {
                request.status = await this.statusesService.findOne('8');
                await request.save();
              } else if (date > request.endDate) {
                request.status = await this.statusesService.findOne('9');
                await request.save();
              }
            }
          });
        }
      } else if (month !== 0 && userId !== null) {
        requests = await this.requestsModel
          .find({
            createdAt: {
              $gte: new Date(new Date().getFullYear(), month - 1, 1),
              $lt: new Date(new Date().getFullYear(), month, 1),
            },
            user: new Types.ObjectId(userId),
          })
          .populate({
            path: 'user requestType status reviewedBy',
            select: 'name -_id',
          })
          .sort({ createdAt: -1 });

        if (requests) {
          requests.forEach(async (request) => {
            if (request.status['name'] === 'Aprobado') {
              if (date > request.startDate && date < request.endDate) {
                request.status = await this.statusesService.findOne('8');
                await request.save();
              } else if (date > request.endDate) {
                request.status = await this.statusesService.findOne('9');
                await request.save();
              }
            }
          });
        }
      }
    } else {
      requests = await this.requestsModel
        .find({ user: user._id })
        .populate({
          path: 'user requestType status reviewedBy',
          select: 'name -_id',
        })
        .sort({ createdAt: -1 });

      if (requests) {
        requests.forEach(async (request) => {
          if (request.status['name'] === 'Aprobado') {
            if (date > request.startDate && date < request.endDate) {
              request.status = await this.statusesService.findOne('8');
              await request.save();
            } else if (date > request.endDate) {
              request.status = await this.statusesService.findOne('9');
              await request.save();
            }
          }
        });
      }
    }

    return requests;
  }

  async findOne(id: string) {
    return await this.requestsModel.findById(id).populate({
      path: 'user requestType status reviewedBy',
      select: 'name -_id',
    });
  }

  async update(id: string, updateRequestDto: UpdateRequestDto, user: User) {
    return await this.requestsModel.findByIdAndUpdate(id, {
      ...updateRequestDto,
      reviewedBy: user,
    });
  }

  async remove(id: string) {
    return await this.requestsModel.findByIdAndDelete(id);
  }
}
