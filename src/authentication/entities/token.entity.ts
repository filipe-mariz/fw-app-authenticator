import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TokenUserDocument = HydratedDocument<TokenUser>

@Schema()
export class TokenUser {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop()
  token: string;
}

export const TokenUserSchema = SchemaFactory.createForClass(TokenUser);
