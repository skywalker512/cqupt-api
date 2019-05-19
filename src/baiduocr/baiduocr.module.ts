import { Module, HttpModule } from '@nestjs/common';
import { BaiduocrController } from './baiduocr.controller';
import { BaiduocrService } from './baiduocr.service';
import { BaiduOcr } from './baiduocr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([BaiduOcr])],
  controllers: [BaiduocrController],
  providers: [BaiduocrService]
})
export class BaiduocrModule {}
