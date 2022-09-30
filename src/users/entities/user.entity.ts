import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from '../../statuses/entities/status.entity';
import { Documenttype } from '../../documenttypes/entities/documenttype.entity';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    type: Types.ObjectId,
    ref: Documenttype.name,
    required: true,
    index: true,
  })
  documentType: Documenttype | Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  documentNumber: string;

  @Prop({
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({})
  password: string;

  @Prop({
    unique: true,
  })
  phone: string;

  @Prop({})
  landline: string;

  @Prop({
    required: true,
    index: true,
    default: 'Profesor',
  })
  role: string;

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
