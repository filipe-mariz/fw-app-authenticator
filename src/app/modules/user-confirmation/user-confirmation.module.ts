import { Module } from '@nestjs/common';
import { UserConfirmationService } from './user-confirmation.service';
import { UserConfirmationController } from './user-confirmation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersConfirmation, UsersConfirmationSchema } from './schema/user-confirmation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: UsersConfirmation.name,
      schema: UsersConfirmationSchema
    }])
  ],
  controllers: [UserConfirmationController],
  providers: [UserConfirmationService],
})
export class UserConfirmationModule {}
