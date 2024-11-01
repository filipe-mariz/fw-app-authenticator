import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post()
  public async create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.createTokenRedis(createAuthenticationDto);
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.authenticationService.findToken(token);
  }
}
