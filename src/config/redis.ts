import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class CacheService extends Redis {
	constructor() {
		super();
		super.on('connect', () => console.log('sucess on conect with redis'))
		super.on('error', error => {
			console.log('error on conect redis', error);
			process.exit(1)
		})
	}
}
