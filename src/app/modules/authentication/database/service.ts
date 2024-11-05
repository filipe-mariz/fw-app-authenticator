export abstract class SqlService {
  abstract findOne(where: { email: string }): Promise<IUser>;
}

export abstract class NoSqlService {
  abstract setTokenAtMongo(userId: string, token: string): Promise<object>;
  abstract setTokenAtRedis(userId: string, token: string): Promise<string>;

  abstract getTokenMongo(userId: string): Promise<string>;
  abstract getTokenRedis(userId: string): Promise<string | object>;
}