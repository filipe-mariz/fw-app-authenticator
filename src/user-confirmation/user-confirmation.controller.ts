import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserConfirmationService } from './user-confirmation.service';
import { CreateUserConfirmationDto } from './dto/create-user-confirmation.dto';

@Controller('user-confirmation')
export class UserConfirmationController {
  constructor(private readonly userConfirmationService: UserConfirmationService) {}

  @Post()
  public create(@Body() createUserConfirmationDto: CreateUserConfirmationDto) {
    return this.userConfirmationService.create(createUserConfirmationDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userConfirmationService.findOne(id);
  }
}
