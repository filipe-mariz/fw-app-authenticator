// import { defaulTableSettings, primaryKey } from '../../../../utils/global/GlobalSequelize';
import { Table, Model, Column } from "sequelize-typescript";

@Table({
	timestamps: true,
	underscored: true,
	paranoid: true,
	scopes: {
		defaultOption: {
			where: { deleted_at: null },
			paranoid: false,
			raw: true
		}
	}
})
export class users extends Model {
	@Column({ primaryKey: true })
	id: number;

	@Column
	name: string;

	@Column({ unique: true })
	cpf: string;

	@Column({ unique: true })
	whatsapp: string;

	@Column({ unique: true })
	email: string;

	@Column
	password: string;

	@Column
	deleted_at: Date;
};
