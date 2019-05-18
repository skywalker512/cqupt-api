import { Module } from '@nestjs/common';
import { BaiduocrController } from './baiduocr.controller';
import { BaiduocrService } from './baiduocr.service';

@Module({
  controllers: [BaiduocrController],
  providers: [BaiduocrService]
})
export class BaiduocrModule {}
