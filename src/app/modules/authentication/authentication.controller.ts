import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) { }

  @Post()
  @GrpcMethod('AuthenticationService', 'Create')
  public createWithRest(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.createTokenRedis(createAuthenticationDto);
  }

  @Get(':token')
  @GrpcMethod('AuthenticationService', 'ValidToken')
  public validToken(@Param('token') tokenParams: string, @Body('token') tokenBody: string) {
    return this.authenticationService.findToken(tokenParams || tokenBody);
  }
}
