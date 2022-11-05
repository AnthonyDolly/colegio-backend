import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CheckInTime extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  hour: string;
}

export const CheckInTimeSchema = SchemaFactory.createForClass(CheckInTime);
