import { MongooseModule } from '@nestjs/mongoose';
import common from 'src/config/common';

export const mongooseModule = MongooseModule.forRoot(common.mongoHost);
