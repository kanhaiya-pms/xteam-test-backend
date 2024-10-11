import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

export enum ERole {
    "ADMIN" = "ADMIN"
}

@Schema()
export class Users {
  @Prop({required: true, type: String, unique: true})
  email: string;

  @Prop({required: true, type: String})
  password: string;

  @Prop({ default: ERole.ADMIN, enum: ERole, required: false})
  role: ERole;
}

export const UsersSchema = SchemaFactory.createForClass(Users);