import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { DatabaseService } from './database/service';
import configCommon from 'src/config/common';

@Injectable()
export class AuthenticationService {
  constructor(private database: DatabaseService) { }

  public async createTokenRedis(createAuthenticationDto: CreateAuthenticationDto): Promise<Object> {
    const user: IUser = await this.database.getUser({ email: createAuthenticationDto.userId });
    const comparePassword = this.comparePassword(user, createAuthenticationDto);

    if (comparePassword) {
      return {
        code: 'INVALID_CREDENTIALS',
        message: 'email or password does not match'
      };
    }

    const token: string = this.encript(createAuthenticationDto);
    await this.database.setCache(createAuthenticationDto.userId, token);

    return { token };
  }

  private comparePassword(user: IUser, createAuthenticationDto: CreateAuthenticationDto): boolean {
    const isPasswordValid = bcrypt.compareSync(createAuthenticationDto.password, user.password);
    return !isPasswordValid || !user;
  }

  private encript(createAuthenticationDto: CreateAuthenticationDto) {
    return jwt.sign(
      {
        authType: createAuthenticationDto.authType,
        siglaApp: createAuthenticationDto.siglaApp,
        userId: createAuthenticationDto.userId,
        password: bcrypt.hashSync(JSON.stringify(createAuthenticationDto.password), 10)
      },
      configCommon.jsonwebtokenCode,
      {
        expiresIn: "1h"
      }
    );
  }

  public findOne(token: string): object {
    const decodedToken: any = jwt.decode(token);

    return {
      authorization: this.database.getCache(decodedToken.userId)
        ? true
        : false
    }
  }
}
