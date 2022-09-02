import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Status } from '../../statuses/entities/status.entity';
import { User } from '../../users/entities/user.entity';

@Schema()
export class UserAssistance extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  user: User | Types.ObjectId;

  @Prop({
    required: true,
    index: true,
  })
  day: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Status.name,
    required: true,
    index: true,
  })
  status: Status | Types.ObjectId;
}

export const UserAssistanceSchema =
  SchemaFactory.createForClass(UserAssistance);

UserAssistanceSchema.index({ user: 1, day: 1 }, { unique: true });
