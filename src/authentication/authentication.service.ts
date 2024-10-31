import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';


@Injectable()
export class AuthenticationService {
  private client: Redis;

  constructor() {
    this.client = new Redis({ host: 'localhost', port: 6379 })
  }

  public async createTokenRedis(createAuthenticationDto: CreateAuthenticationDto): Promise<Object> {
    const encriptPassword: string = bcrypt.hashSync(JSON.stringify(createAuthenticationDto.password), 10);

    const token: string = jwt.sign({
      authType: createAuthenticationDto.authType,
      siglaApp: createAuthenticationDto.siglaApp,
      userId: createAuthenticationDto.userId,
      password: encriptPassword
    }, 'F20W42')

    await this.client.set(createAuthenticationDto.userId, token);

    return { token };
  }

  private encript(createAuthenticationDto: CreateAuthenticationDto) {
    const encriptPassword: string = bcrypt.hashSync(JSON.stringify(createAuthenticationDto.password), 10);

    const token: string = jwt.sign({
      authType: createAuthenticationDto.authType,
      siglaApp: createAuthenticationDto.siglaApp,
      userId: createAuthenticationDto.userId,
      password: encriptPassword
    }, 'F20W42')

    return {
      token,
      encriptPassword
    }
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: string) {
    return this.client.get(id);
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
