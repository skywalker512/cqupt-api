import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaiduocrModule } from './baiduocr/baiduocr.module';
import { QcloudsmsModule } from './qcloudsms/qcloudsms.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot() ,BaiduocrModule, QcloudsmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
