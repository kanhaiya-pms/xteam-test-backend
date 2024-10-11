import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  get() {
    return this.contactService.get()
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.contactService.getById(id)
  }

  @Patch("edit/:id")
  edit(@Param("id") id: string,@Body() createContactDto: CreateContactDto) {
    return this.contactService.edit(createContactDto,id);
  }


}
