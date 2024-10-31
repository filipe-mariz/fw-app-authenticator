import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Redis from 'ioredis';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { users } from './entities/user.entity';

import configCommon from 'src/config/common';

@Injectable()
export class AuthenticationService {
  private readonly repository = this.usersRepository.scope('defaultOptions');
  private client: Redis;

  constructor(
    @InjectModel(users)
    private usersRepository: typeof users,
  ) {
    this.client = new Redis({ host: 'localhost', port: 6379 });
  }

  public async createTokenRedis(createAuthenticationDto: CreateAuthenticationDto): Promise<Object> {
    const user: IUser = await this.getUserByEmail({ email: createAuthenticationDto.userId });
    const comparePassword = this.comparePassword(user, createAuthenticationDto);

    if (comparePassword) {
      return {
        code: 'INVALID_CREDENTIALS',
        message: 'email or password does not match'
      };
    }

    const token: string = this.encript(createAuthenticationDto);
    await this.client.set(createAuthenticationDto.userId, token, 'EX', 3600);

    return { token };
  }

  private async getUserByEmail(where: { email: string }): Promise<IUser> {
    const user: IUser = await this.repository.findOne<users>({
      where,
      attributes: ['email', 'password'],
    });

    return user;
  };

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
      authorization: this.client.get(decodedToken.userId)
        ? true
        : false
    }
  }
}
