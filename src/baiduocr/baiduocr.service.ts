import { Injectable } from '@nestjs/common';
import { Auth } from '@baiducloud/sdk'

@Injectable()
export class BaiduocrService {
  async getAuthorization(method:string = 'POST', uri: string = '/rest/2.0/ocr/v1/general_basic') {
    const auth = new Auth('', '')
    const date = new Date()
    const time = Math.round(date.getTime()/1000)
    const bceDate = date.toISOString().replace(/\.\d+Z$/, 'Z')
    console.log(method, uri, bceDate)
    return auth.generateAuthorization(method, uri, {}, {'host': 'aip.baidubce.com', 'x-bce-date': bceDate}, time, 180000)
  }
}
