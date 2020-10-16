// Core
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// App
import { Role, Sex } from '../../../common/types';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  sex: Sex;

  @Prop()
  role?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
