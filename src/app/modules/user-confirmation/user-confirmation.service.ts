import { Injectable } from '@nestjs/common';
import { CreateUserConfirmationDto } from './dto/create-user-confirmation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersConfirmation } from './schema/user-confirmation.entity';
import { gerarCodigo } from './utils/generateCode';

@Injectable()
export class UserConfirmationService {
  constructor(
    @InjectModel(UsersConfirmation.name)
    private productRepository: Model<UsersConfirmation>
  ) {}

  public create(createProductDto: CreateUserConfirmationDto) {
    const createProduct = new this.productRepository({
      confirmationCode: gerarCodigo(),
      ...createProductDto
    })

    return createProduct.save();
  }

  public findOne(email: string) {
    return this.productRepository.findOne({
      email
    }).exec();
  }

  public remove(id: string) {
    return this.productRepository.findByIdAndDelete(id);;
  }
}
