import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Status } from '../../statuses/entities/status.entity';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Assistance {
  @Prop({
    required: true,
  })
  checkInTime: Date;

  @Prop({
    required: false,
  })
  checkOutTime: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Status.name,
    required: true,
    index: true,
  })
  status: Status | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  registeredBy: User | Types.ObjectId;
}

export const AssistanceSchema = SchemaFactory.createForClass(Assistance);
