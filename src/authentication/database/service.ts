export abstract class SqlService {
  abstract getUser(where: { email: string }): Promise<IUser>;
}

export abstract class NoSqlService {
  abstract setTokenAtMongo(userId: string, token: string);
  abstract getTokenMongo(userId: string);
  abstract setTokenAtRedis(userId: string, token: string): Promise<void>;
  abstract getTokenRedis(userId: string): Promise<string | object>;
}