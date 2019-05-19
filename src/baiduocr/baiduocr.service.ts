import { Injectable, Inject, HttpService } from '@nestjs/common';
import { BaiduOcr } from './baiduocr.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
// import { Auth } from '@baiducloud/sdk'

@Injectable()
export class BaiduocrService {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectRepository(BaiduOcr) private readonly baiduOcrRepo: Repository<BaiduOcr>,
  ) {}
  // 询问过百度的工单，他们似乎不再支持 Authorization 这种方式调用
  // async getAuthorization(method:string = 'POST', uri: string = '/rest/2.0/ocr/v1/general_basic') {
  //   const auth = new Auth('', '')
  //   const date = new Date()
  //   const time = Math.round(date.getTime()/1000)
  //   const bceDate = date.toISOString().replace(/\.\d+Z$/, 'Z')
  //   console.log(method, uri, bceDate)
  //   return auth.generateAuthorization(method, uri, {}, {'host': 'aip.baidubce.com', 'x-bce-date': bceDate, 'content-type': 'application/x-www-form-urlencoded'}, time, 180000)
  // }

  async getOcrToken() {
    const preToken = await this.baiduOcrRepo.find({ order: { createdAt: 'DESC' } , take: 1})
    let access_token: string
    if (preToken.length === 0) {
      access_token = await this.getToken()
    } else {
      const date = new Date(preToken[0].createdAt)
      if (date.getTime() + 1000*60*60*24*29 <= Date.now()) {
        access_token = await this.getToken()
      } else {
        access_token = preToken[0].accessToken
      }
    }
    return access_token
  }

  private async getToken(): Promise<string> {
    const { BD_OCR_AK, BD_OCR_SK } = process.env
    const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BD_OCR_AK}&client_secret=${BD_OCR_SK}`
    const res = await this.httpService.get(url).toPromise()
    if (!res.data.access_token) throw new RpcException({ code: 5003, message: 'access_token 获取失败' })
    await this.baiduOcrRepo.save(this.baiduOcrRepo.create({ accessToken: res.data.access_token }))
    return res.data.access_token
  }
}
