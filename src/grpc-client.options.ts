import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0' + ':50055',
    package: 'cqupt_api',
    protoPath: join(__dirname, './protobufs/cqupt_api.proto'),
    loader: {
      arrays: true
    }
  },
}