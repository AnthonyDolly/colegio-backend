import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Assistance extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  day: Date;
}

export const AssistanceSchema = SchemaFactory.createForClass(Assistance);
