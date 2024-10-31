import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: users,
    }
  ],
  exports: [SequelizeModule]
})
export class AuthenticationModule {}
