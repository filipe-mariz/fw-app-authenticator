import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './app/database/database.module';
import { mongooseModule } from './app/database/nosql.config';
import { AuthenticationModule } from './app/modules/authentication/authentication.module';
import { UserConfirmationModule } from './app/modules/user-confirmation/user-confirmation.module';
import sequelizeConfig from './app/database/sql.config';

@Module({
  imports: [
    sequelizeConfig,
    mongooseModule,
    AuthenticationModule,
    DatabaseModule,
    UserConfirmationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
