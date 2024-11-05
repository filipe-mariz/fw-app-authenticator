import { MongooseModule } from '@nestjs/mongoose';
import common from '../config/common';

export const mongooseModule = MongooseModule.forRoot(common.mongoHost);
