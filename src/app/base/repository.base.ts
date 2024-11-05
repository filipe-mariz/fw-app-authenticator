import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository {
  private repository: any;

  constructor(model: any) {
    this.repository = model.scope('defaultOptions');
  }

  public async findOne(where: any): Promise<any> {
    return this.repository.findOne({ where });
  }
}
