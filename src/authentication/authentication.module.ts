import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './entities/user.entity';
import { DatabaseRepository } from './database/repository';
import { DatabaseService } from './database/service';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: users,
    },
    {
      provide: DatabaseService,
      useClass: DatabaseRepository
    }
  ],
  exports: [SequelizeModule]
})
export class AuthenticationModule { }
