import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Status extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  code: number;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
  })
  isActive: boolean;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
