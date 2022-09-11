import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Assistance, AssistanceSchema } from './assistance.entity';

@Schema()
export class UserAssistance extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
    index: true,
  })
  user: User | Types.ObjectId;

  @Prop({
    type: [AssistanceSchema],
  })
  assistances: Types.Array<Assistance>;
}

export const UserAssistanceSchema =
  SchemaFactory.createForClass(UserAssistance);
