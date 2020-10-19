// Core
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// App
import { Role, Sex } from '../../../common/types';

@Schema()
export class User extends Document {
  @ApiProperty({
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'jdoe@example.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    example: '+380 73 111-11-11',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    example: 'ab12345Cd',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: Sex.f,
  })
  @Prop({ required: true })
  sex: Sex;

  @ApiProperty({
    example: Role.teacher,
  })
  @Prop()
  role?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
