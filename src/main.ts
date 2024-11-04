import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const protoPath = join(__dirname, 'proto', 'auth.proto');

  console.log(protoPath)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, 'proto/auth.proto'),
      url: 'localhost:50051'
    }
  })
  await app.startAllMicroservices()
  await app.listen(process.env.PORT);
}
bootstrap();
