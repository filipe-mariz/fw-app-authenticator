import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersConfirmationDocument = HydratedDocument<UsersConfirmation>

@Schema()
export class UsersConfirmation {
	@Prop()
	id: string;

	@Prop()
	userId: string;

	@Prop()
	confirmationCode: string;

	@Prop({ default: false })
	isConfirmed: boolean;

	@Prop()
	email: string;
}

export const UsersConfirmationSchema = SchemaFactory.createForClass(UsersConfirmation);
