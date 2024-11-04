import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthenticationService', 'Create')
  create(data: any) {
    console.log(data);
    return this.authService.create(data);
  }

  findAll(data) {
    return this.authService.findAll();
  }

  @MessagePattern('findOneAuth')
  findOne(@Payload() id: number) {
    return this.authService.findOne(id);
  }

  @MessagePattern('updateAuth')
  update(@Payload() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(updateAuthDto.id, updateAuthDto);
  }

  @MessagePattern('removeAuth')
  remove(@Payload() id: number) {
    return this.authService.remove(id);
  }
}
