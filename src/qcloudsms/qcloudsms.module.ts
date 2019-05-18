import { Module, HttpModule } from '@nestjs/common';
import { QcloudsmsController } from './qcloudsms.controller';
import { QcloudsmsService } from './qcloudsms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcloudSms } from './qcloudsms.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([QcloudSms])],
  controllers: [QcloudsmsController],
  providers: [QcloudsmsService]
})
export class QcloudsmsModule {}
