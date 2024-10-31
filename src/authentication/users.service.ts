import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(users)
    private userModel: typeof users,
  ) {}

  async createUser(name: string, email: string): Promise<users> {
    return this.userModel.create({ name, email });
  }

  async findAllUsers(): Promise<users[]> {
    return this.userModel.findAll();
  }
}
