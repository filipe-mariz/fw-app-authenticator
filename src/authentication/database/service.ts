export abstract class DatabaseService {
  abstract getUser(where: { email: string }): Promise<IUser>;
  abstract setCache(userId: string, token: string): Promise<void>;
  abstract getCache(userId: string): Promise<string>;
}