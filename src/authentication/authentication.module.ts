import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: users,
    }
  ],
  exports: [SequelizeModule]
})
export class AuthenticationModule {}
