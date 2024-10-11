import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contacts, EStatus } from './schema/contact.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contacts.name) private readonly modal: Model<Contacts>) { }


  async create(createContactDto: CreateContactDto) {
    Object.values(createContactDto).map((item) => {
      const str = item.trim()
      console.log(str);

      if (str.length <= 0) {
        //  message.error("field is required and only space not allow")
        throw new BadRequestException("remove extra backspace")
      }
    })
    return await this.modal.create(createContactDto);
  }

  async get() {
    return await this.modal.find()
  }

  async getById(id: string) {
    return await this.modal.findById(id)
  }

  async edit(dto: any, id: string) {
    const user = await this.modal.findById(id)
    const str = dto.reply.trim()

    if (str.length <= 0) {
      throw new BadRequestException("remove extra backspace")
    }
    
    // const data = await this.modal.findOne({ email: dto.email })
    // console.log("dfsdkfs",data);



    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Administrator" <kanhaiya.psa@postmortemshala.co.in>',
        to: `${user.email}, kanhaiyanri43@gmail.com`,
        subject: 'Query reply',
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <p>Dear user, your query has been updated</p>
              <p>${dto.reply}</p>
              <p>Best regards,</p>
              <p>auth-web-application(kanhaiya)</p>
            </div>"`,
      });
      console.log('Message Sent', info.response);
    } catch (error) {
      console.error('Error Occurred', error);
      throw new BadRequestException({
        message: 'Failed to send OTP email',
        error: 'MailError',
      });
    }


    return await this.modal.findByIdAndUpdate(id, {
      reply: str,
      status: EStatus.RESOLVE
    },{lean: true})



  }


}
