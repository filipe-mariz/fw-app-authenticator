import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { users } from "src/authentication/entities/user.entity";
import configCommon from 'src/config/common'

export const models = [users]
export const sequelizeConfig = SequelizeModule.forRoot({
	dialect: 'postgres',
	host: configCommon.dbHost,
	port: +configCommon.dbPort,
	username: configCommon.dbUsername,
	password: configCommon.dbPassword,
	database: configCommon.dbDielect,
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
				host: configCommon.dbHost,
				port: +configCommon.dbPort,
				username: configCommon.dbUsername,
				password: configCommon.dbPassword,
				database: configCommon.dbDielect,
				logging: false
			});
			sequelize.addModels(models);
			await sequelize.sync();
			return sequelize;
		},
	},
];

export default sequelizeConfig;
