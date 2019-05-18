import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaiduocrModule } from './baiduocr/baiduocr.module';

@Module({
  imports: [BaiduocrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
