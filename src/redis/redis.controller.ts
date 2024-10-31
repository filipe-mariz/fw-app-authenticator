import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) { }

  @Post()
  async set(@Body('value') value: { value: string }) {
    const resp = await this.redisService.set('teste', JSON.stringify(value));
    return resp;
  }

  @Get()
  async get() {
    const value = await this.redisService.get('teste');
    return value
  }
}
