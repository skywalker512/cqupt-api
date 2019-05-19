import { HttpService, Injectable, Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcloudSms } from './qcloudsms.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class QcloudsmsService {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectRepository(QcloudSms) private readonly qcloudSmsRepo: Repository<QcloudSms>,
  ) { }
  private smsApiBase = 'https://yun.tim.qq.com/v5/tlssmssvr/';
  async sendVerifyCode(mobile: string): Promise<any> {
    const {  SMS_CODE_TEMPLATEID, SMS_SIGN } = process.env
    const { sig, tel, url, time } = await this.common(mobile)
    const randomCode = Math.random().toString(10).slice(2, 8)
    await this.qcloudSmsRepo.save(this.qcloudSmsRepo.create({ mobile, randomCode, sendAt: new Date() }))
    // api 调用参数
    const reqBody = JSON.stringify({
      sig,
      time,
      sign: SMS_SIGN,
      tpl_id: SMS_CODE_TEMPLATEID,
      params: [randomCode, '15'],
      tel
    });
    console.log(randomCode)
    await this.httpService.post(url, reqBody).toPromise()
  }

  async validateCode(mobile: string, code: string) {
    const exist = await this.qcloudSmsRepo.find({ where: { mobile }, order: { sendAt: 'DESC' }, take: 1 })
    if (exist.length === 0) {
      throw new RpcException({ code: 404, message: '输入的手机号码与接收短信的手机号码不一致' })
    }

    if (code !== exist[0].randomCode) {
      throw new RpcException({ code: 406, message: '验证码错误' });
    }

    const date = new Date(exist[0].sendAt)
    if(!(date.getTime() + 1000*60*15 >= Date.now())) {
      throw new RpcException({ code: 406, message: '验证码过期' });
    }
    return
  }

  async sendFoundCardNotice(mobile: string, stuNum: string, locationName: string): Promise<any> {
    const {  SMS_NOTIES_TEMPLATEID, SMS_SIGN } = process.env
    const { sig, tel, url, time } = await this.common(mobile)
    const randomCode = Math.random().toString(10).slice(2, 8)
    await this.qcloudSmsRepo.save(this.qcloudSmsRepo.create({ mobile, randomCode, sendAt: new Date() }))
    // api 调用参数
    const reqBody = JSON.stringify({
      sig,
      time,
      sign: SMS_SIGN,
      tpl_id: SMS_NOTIES_TEMPLATEID,
      params: [stuNum, locationName],
      tel
    });
    await this.httpService.post(url, reqBody).toPromise()
  }

  private async calculateSignature(appKey: string, random: number, time: number, mobile: string): Promise<string> {
    return crypto.createHash('sha256')
      .update(`appkey=${appKey}&random=${random}&time=${time}&mobile=${mobile}`, 'utf8')
      .digest('hex');
  }

  private async common(mobile: string) {
    const { SMS_APPID, SMS_TEMPLATEID, SMS_SIGN, SMS_APPKEY } = process.env
    // api 请求地址 拼接成
    let url = '';
    // 随机数
    const random = Math.round(Math.random() * 99)
    // 发送短信系统当前时间戳
    const time = Math.floor(Date.now() / 1000)
    // App 凭证
    const sig = await this.calculateSignature(SMS_APPKEY, random, time, mobile);
    // 根据 mobile 类型，改变 api 地址及 mobile 参数内容
    url = this.smsApiBase + 'sendsms';
    const tel = { mobile, nationcode: '86' };    // nationcode 为国家码，现只支持国内(86)
    url += `?sdkappid=${SMS_APPID}&random=${random}`;
    return { sig, tel, url, time }
  }
}
