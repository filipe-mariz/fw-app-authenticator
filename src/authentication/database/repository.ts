import { InjectModel } from "@nestjs/sequelize";
import Redis from "ioredis";
import { users } from "../entities/user.entity";
import { DatabaseService } from "./service";

export class DatabaseRepository implements DatabaseService {
	private readonly repository = this.usersRepository.scope('defaultOptions');
	private client: Redis;

	constructor(
		@InjectModel(users)
		private usersRepository: typeof users,
	) {
		this.client = new Redis({ host: 'localhost', port: 6379 });
	}

	public async getUser(where: { email: string }): Promise<IUser> {
		const user: IUser = await this.repository.findOne<users>({
			where,
			attributes: ['email', 'password'],
		});

		return user;
	}

	public async setCache(userId: string, token: string): Promise<void> {
    await this.client.set(userId, token, 'EX', 3600);
  }

	public async getCache(userId: string): Promise<string> {
    return this.client.get(userId);
  }
}