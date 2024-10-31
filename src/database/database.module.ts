import { Module } from '@nestjs/common';
import { databaseProviders } from './sql.config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
