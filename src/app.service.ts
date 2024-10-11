import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { CreateDto } from './dto/create.dto.';
import { ChangePassDto } from './dto/changePass.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Users.name) private modal: Model<Users>) {}

  async login(dto: LoginDto){
    if (!dto) {
      throw new BadRequestException("email and pass required field")
    }


    const user = await this.modal.findOne({email: dto.email})

    if (!user) {
      throw new UnauthorizedException("wrong credential")
    }

    if (user.password != dto.password) {
      throw new UnauthorizedException("wrong credential")
    }

    return user
  }

  async create(dto: CreateDto){
    if (!dto) {
      throw new BadRequestException("email and pass required field")
    }


    const user = await this.modal.findOne({email: dto.email})

    if (user) {
      throw new BadRequestException("already exist")
    }

    

    return await this.modal.create(dto)
  }


  async changePass(dto: ChangePassDto){
    const user = await this.modal.findById(dto.id)
    if (!user) {
      throw new UnauthorizedException("wrong credential")
    }

    if (user.password != dto.currentPassword) {
      throw new UnauthorizedException("wrong credential")
    }
    
    return await this.modal.findByIdAndUpdate(dto.id,{
      password: dto.password
    })
  }
}
