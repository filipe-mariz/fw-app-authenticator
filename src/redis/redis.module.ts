import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheService } from 'src/config/redis';

@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    CacheService
  ],
})
export class RedisModule {}
