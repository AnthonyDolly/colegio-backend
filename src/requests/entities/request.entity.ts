import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Requesttype } from 'src/requesttypes/entities/requesttype.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';

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
  day: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Status.name,
    required: true,
  })
  status: Status | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  reviewedBy: User | Types.ObjectId;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
