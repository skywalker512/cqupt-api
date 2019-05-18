import { Controller, Inject } from '@nestjs/common';
import { BaiduocrService } from './baiduocr.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('baiduocr')
export class BaiduocrController {
  constructor(
    @Inject(BaiduocrService) private readonly baiduocrService: BaiduocrService
  ) {}

  @GrpcMethod()
  async getAuthorization(payload: { method:string , uri: string }) {
    const { method, uri } = payload
    const authorization = await this.baiduocrService.getAuthorization(method, uri)
    return { code: 200, message: '签名生成成功', authorization }
  }
}
