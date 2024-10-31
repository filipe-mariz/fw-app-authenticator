import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { users } from "src/authentication/entities/user.entity";

export const models = [users]
export const sequelizeConfig = SequelizeModule.forRoot({
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '1234',
	database: 'postgres',
	autoLoadModels: true,
	synchronize: true,
	logging: false,
	models,
})

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: 'localhost',
				port: 5432,
				username: 'postgres',
				password: '1234',
				database: 'postgres',
				logging: false
			});
			sequelize.addModels(models);
			await sequelize.sync();
			return sequelize;
		},
	},
];

export default sequelizeConfig;