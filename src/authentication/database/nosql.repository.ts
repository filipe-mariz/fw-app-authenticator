import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import Redis from "ioredis";

import { NoSqlService } from "./service";
import { TokenUser } from "../entities/token.entity";

export class NoSqlRepository implements NoSqlService {
	private readonly client: Redis;

	constructor(
		@InjectModel(TokenUser.name)
		private tokenRepository: Model<TokenUser>
	) {
		this.client = new Redis({ host: 'localhost', port: 6379 });
	}

	public setTokenAtMongo(userId: string, token: string) {
		const createProduct = new this.tokenRepository({
			userId,
			token
		})

		return createProduct.save();
	}

	public async getTokenMongo(userId: string) {
		const cachedToken = await this.client.get(userId);
		if (cachedToken) return cachedToken;

    const data = await this.tokenRepository.findOne({ userId }).exec();
		await this.client.set(userId, data.token, 'EX', 3600);

		return data.token;
  }

	public async setTokenAtRedis(userId: string, token: string): Promise<void> {
		await this.client.set(userId, token, 'EX', 3600);
	}

	public async getTokenRedis(userId: string): Promise<string> {
		const token = await this.client.get(userId);
		return token;
	}
}
