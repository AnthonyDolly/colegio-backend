import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
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

export const RoleSchema = SchemaFactory.createForClass(Role);
