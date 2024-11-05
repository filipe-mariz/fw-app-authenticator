import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { SqlService, NoSqlService } from './database/service';
import configCommon from '../../config/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly sql: SqlService,
    private readonly noSql: NoSqlService,
  ) { }

  public async createTokenRedis(createAuthenticationDto: CreateAuthenticationDto): Promise<Object> {
    const user: IUser = await this.sql.findOne({ email: createAuthenticationDto.userId });
    const comparePassword = this.comparePassword(user, createAuthenticationDto);

    if (comparePassword) {
      return {
        code: 'INVALID_CREDENTIALS',
        message: 'email or password does not match'
      };
    }

    const action = createAuthenticationDto.authType === 'CELLPHONE' ? 'setTokenAtMongo' : 'setTokenAtRedis';
    const token: string = this.encript(createAuthenticationDto);
    await this.noSql[action](createAuthenticationDto.userId, token);

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

  public async findToken(token: string) {
    const decodedToken: any = jwt.decode(token);
    const action = decodedToken.authType === 'CELLPHONE' ? 'getTokenMongo' : 'getTokenRedis'

    return {
      authorization: await this.noSql[action](decodedToken.userId)
    }
  }
}
