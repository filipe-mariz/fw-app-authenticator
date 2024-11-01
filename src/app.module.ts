import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import sequelizeConfig from './database/sql.config';
import { mongooseModule } from './database/nosql.config';
import { UserConfirmationModule } from './user-confirmation/user-confirmation.module';

@Module({
  imports: [
    sequelizeConfig,
    mongooseModule,
    AuthenticationModule,
    DatabaseModule,
    UserConfirmationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
