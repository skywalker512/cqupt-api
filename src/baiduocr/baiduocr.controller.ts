import { Controller, Inject } from '@nestjs/common';
import { BaiduocrService } from './baiduocr.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('baiduocr')
export class BaiduocrController {
  constructor(
    @Inject(BaiduocrService) private readonly baiduocrService: BaiduocrService
  ) {}

  @GrpcMethod()
  async getOcrToken(payload: {}) {
    const accessToken = await this.baiduocrService.getOcrToken()
    return { code: 200, message: '签名生成成功', accessToken }
  }
}
