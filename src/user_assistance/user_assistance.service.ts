import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

import { CreateUserAssistanceDto } from './dto/create-user_assistance.dto';
import { FilterUserAssistanceDto } from './dto/filter-user_assistance.dto';
import { RegisterAssistanceDto } from './dto/register_assistance.dto';
import { UserAssistance } from './entities/user_assistance.entity';

@Injectable()
export class UserAssistanceService {
  constructor(
    @InjectModel(UserAssistance.name)
    private readonly userAssistanceModel: Model<UserAssistance>,
  ) {}

  async create(createUserAssistanceDto: CreateUserAssistanceDto) {
    try {
      const a = await this.userAssistanceModel.create(createUserAssistanceDto);
      return a;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(filterUserAssistanceDto?: FilterUserAssistanceDto) {
    const { month = 0, user = null } = filterUserAssistanceDto;

    if (month === 0 && user === null) {
      const userAssistances = await this.userAssistanceModel
        .find({}, { __v: 0 })
        .populate({
          path: 'user',
          select: 'name lastName documentType documentNumber role',
          populate: { path: 'role documentType', select: 'name -_id' },
        })
        .populate({
          path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
          select: 'name',
        });

      return userAssistances;
    } else if (month !== 0 && user === null) {
      const userAssistances = await this.userAssistanceModel
        .find({}, { __v: 0 })
        .populate({
          path: 'user',
          select: 'name lastName documentType documentNumber role',
          populate: { path: 'role documentType', select: 'name -_id' },
        })
        .populate({
          path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
          select: 'name code',
        });

      const assistancesByMonth = userAssistances.map((userAssistance) => {
        const assistances = userAssistance.assistances.filter((assistance) => {
          return new Date(assistance.checkInTime).getMonth() === month - 1;
        });
        return {
          _id: userAssistance._id,
          user: userAssistance.user,
          assistances,
        };
      });

      return assistancesByMonth;
    } else if (month === 0 && user !== null) {
      const userAssistance = await this.userAssistanceModel
        .findOne({ user: user }, { __v: 0 })
        .populate({
          path: 'user',
          select: 'name lastName documentType documentNumber role',
          populate: { path: 'role documentType', select: 'name -_id' },
        })
        .populate({
          path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
          select: 'name code',
        });

      return userAssistance;
    } else if (month !== 0 && user !== null) {
      const userAssistance = await this.userAssistanceModel
        .findOne({ user: user }, { __v: 0 })
        .populate({
          path: 'user',
          select: 'name lastName documentType documentNumber role',
          populate: { path: 'role documentType', select: 'name -_id' },
        })
        .populate({
          path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
          select: 'name code',
        });

      if (!userAssistance) {
        throw new BadRequestException(
          `UserAssistance with id ${user} not found`,
        );
      }

      const assistances = userAssistance.assistances.filter((assistance) => {
        return new Date(assistance.checkInTime).getMonth() === month - 1;
      });

      return {
        _id: userAssistance._id,
        user: userAssistance.user,
        assistances,
      };
    }
    //TODO: Crear funcion para filter
  }

  async findOne(userId: string) {
    const userAssistance = await this.userAssistanceModel
      .findOne({ user: userId }, { __v: 0 })
      .populate({
        path: 'user',
        select: 'name lastName documentType documentNumber role',
        populate: { path: 'role documentType', select: 'name -_id' },
      })
      .populate({
        path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
        select: 'name',
      });
    if (!userAssistance) {
      throw new BadRequestException(
        `UserAssistance with userId ${userId} not found`,
      );
    }
    return userAssistance;
  }

  async registerUserAssistance(
    userId: string,
    updateUserAssistanceDto: RegisterAssistanceDto,
    user: User,
  ) {
    await this.findOne(userId);
    try {
      const userAssistance = await this.userAssistanceModel.findOneAndUpdate(
        {
          user: userId,
        },
        {
          $push: {
            assistances: {
              checkInTime: new Date(Date.now()),
              status: updateUserAssistanceDto.assistances[0].status,
              checkInTimeRegisteredBy: user._id,
            },
          },
        },
        { new: true },
      );
      return userAssistance.assistances[userAssistance.assistances.length - 1];
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async registerUserCheckOutTime(assistanceId: string, user: User) {
    try {
      const userAssistance = await this.userAssistanceModel.findOneAndUpdate(
        {
          'assistances._id': assistanceId,
        },
        {
          $set: {
            'assistances.$.checkOutTime': new Date(Date.now()),
            'assistances.$.checkOutTimeRegisteredBy': user._id,
          },
        },
        { new: true },
      );
      return userAssistance.assistances[userAssistance.assistances.length - 1];
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(userId: string) {
    await this.findOne(userId);
    return await this.userAssistanceModel.findOneAndDelete({ user: userId });
  }

  async getReportByMonth(month: number) {
    this.validateMonth(month);
    const userAssistances = [];
    const userAssistance = await this.userAssistanceModel.aggregate([
      {
        $project: {
          user: '$user',
          assistances: {
            $filter: {
              input: '$assistances',
              as: 'assistances',
              cond: {
                $eq: [{ $month: '$$assistances.checkInTime' }, month],
              },
            },
          },
        },
      },
    ]);

    await this.userAssistanceModel.populate(userAssistance, {
      path: 'user',
      select: 'name lastName documentType documentNumber role',
      populate: { path: 'role documentType', select: 'name -_id' },
    });

    await this.userAssistanceModel.populate(userAssistance, {
      path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
      select: 'name code',
    });

    userAssistance.forEach((userAssistance) => {
      if (userAssistance.assistances.length > 0) {
        userAssistances.push({
          user: userAssistance.user,
          assistances: this.countTypeOfAssistances(userAssistance.assistances),
        });
      }
    });

    return userAssistances;
  }

  async getReportByMonthAndUser(month: number, user: string) {
    this.validateMonth(month);
    const userAssistance = await this.userAssistanceModel
      .findOne({ user: user }, { __v: 0 })
      .populate({
        path: 'user',
        select: 'name lastName documentType documentNumber role',
        populate: { path: 'role documentType', select: 'name -_id' },
      })
      .populate({
        path: 'assistances.status assistances.checkInTimeRegisteredBy assistances.checkOutTimeRegisteredBy',
        select: 'name code',
      });

    if (!userAssistance) {
      throw new BadRequestException(`UserAssistance with id ${user} not found`);
    }

    const assistances = userAssistance.assistances.filter((assistance) => {
      return new Date(assistance.checkInTime).getMonth() === month - 1;
    });

    return {
      user: userAssistance.user,
      assistances: this.countTypeOfAssistances(assistances),
    };
  }

  private validateMonth(month: number) {
    if (month < 1 || month > 12) {
      throw new BadRequestException(`Month must be between 1 and 12`);
    }
  }

  private countTypeOfAssistances(assistances: any[]) {
    const assistancesCount = {
      A: 0,
      T: 0,
      F: 0,
    };
    assistances.forEach((assistance) => {
      if (assistance.status.code === 1) {
        assistancesCount.A++;
      } else if (assistance.status.code === 2) {
        assistancesCount.T++;
      } else if (assistance.status.code === 3) {
        assistancesCount.F++;
      }
    });
    return assistancesCount;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(
        `user_assistance already exists in the database ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Check Server logs`);
  }
}
