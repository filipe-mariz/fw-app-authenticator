import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../../../base/repository.base";
import { SqlService } from "./service";
import { users } from "../entities/user.entity";

export class SqlRepository extends BaseRepository implements SqlService {
	constructor(
		@InjectModel(users) usersRepository: typeof users,
	) {
		super(usersRepository)
	}
}