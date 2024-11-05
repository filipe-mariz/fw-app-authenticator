import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './entities/user.entity';
import { SqlRepository } from './database/sql.repository';
import { SqlService, NoSqlService } from './database/service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenUser, TokenUserSchema } from './entities/token.entity';
import { NoSqlRepository } from './database/nosql.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
    MongooseModule.forFeature([{
      name: TokenUser.name,
      schema: TokenUserSchema
    }])
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: users,
    },
    {
      provide: SqlService,
      useClass: SqlRepository
    },
    {
      provide: NoSqlService,
      useClass: NoSqlRepository
    },
  ],
  exports: [SequelizeModule]
})
export class AuthenticationModule { }
