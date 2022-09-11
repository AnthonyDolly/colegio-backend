import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Requesttype extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  code: number;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  isActive: boolean;
}

export const RequesttypeSchema = SchemaFactory.createForClass(Requesttype);
