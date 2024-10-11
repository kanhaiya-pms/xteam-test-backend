import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactsDocument = HydratedDocument<Contacts>;

export enum EStatus {
    "PENDING" = "PENDING",
    "RESOLVE" = "RESOLVE"
}

@Schema()
export class Contacts {
    @Prop({required: true, type: String})
  name: string;

  @Prop({required: true, type: String})
  email: string;

  @Prop({required: true, type: String})
  number: string;

  @Prop({required: true, type: String})
  comment: string;

  @Prop({required: false, type: String})
  reply: string;

  @Prop({ default: EStatus.PENDING, enum: EStatus, required: false})
  status: EStatus;
}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);