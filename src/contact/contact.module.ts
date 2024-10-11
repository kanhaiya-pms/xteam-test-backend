import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactsSchema } from './schema/contact.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contacts.name, schema: ContactsSchema }])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
