import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Requesttype } from './../../requesttypes/entities/requesttype.entity';
import { Status } from './../../statuses/entities/status.entity';
import { User } from './../../users/entities/user.entity';

@Schema()
export class Request extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Requesttype.name,
    required: true,
    index: true,
  })
  requestType: Requesttype | Types.ObjectId;

  @Prop({
    required: true,
  })
  startDate: Date;

  @Prop({
    required: true,
  })
  endDate: Date;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: false,
  })
  file: string;

  @Prop({
    type: Types.ObjectId,
    ref: Status.name,
    required: true,
  })
  status: Status | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
    default: null,
  })
  reviewedBy: User | Types.ObjectId;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
