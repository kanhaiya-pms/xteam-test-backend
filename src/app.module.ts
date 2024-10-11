import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './user.schema';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
