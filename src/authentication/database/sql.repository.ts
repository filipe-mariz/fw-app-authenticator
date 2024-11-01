import { InjectModel } from "@nestjs/sequelize";
import Redis from "ioredis";
import { SqlService } from "./service";
import { users } from "../entities/user.entity";

export class SqlRepository implements SqlService {
	private readonly repository = this.usersRepository.scope('defaultOptions');
	private readonly client: Redis;

	constructor(
		@InjectModel(users)
		private usersRepository: typeof users,
	) {}

	public async getUser(where: { email: string }): Promise<IUser> {
		const user: IUser = await this.repository.findOne<users>({
			where,
			attributes: ['email', 'password'],
		});

		return user;
	}
}