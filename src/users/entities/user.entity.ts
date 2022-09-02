import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Documenttype } from '../../documenttypes/entities/documenttype.entity';
import { Role } from '../../roles/entities/role.entity';

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
    type: Types.ObjectId,
    ref: Role.name,
    required: true,
    index: true,
  })
  role: Role | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
