export abstract class SqlService {
  abstract getUser(where: { email: string }): Promise<IUser>;
}

export abstract class NoSqlService {
  abstract setTokenAtMongo(userId: string, token: string)
  abstract setTokenAtRedis(userId: string, token: string): Promise<void>;
  abstract getCache(userId: string): Promise<string | object>;
}