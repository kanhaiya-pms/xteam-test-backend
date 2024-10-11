import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto.';
import { ChangePassDto } from './dto/changePass.dto';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  login(@Body() dto: LoginDto){
    return this.appService.login(dto);
  }

  @Post("create")
  create(@Body() dto: CreateDto){
    return this.appService.create(dto);
  }

  @Patch("changepassword")
  changePass(@Body() dto: ChangePassDto){
    return this.appService.changePass(dto);
  }

}
