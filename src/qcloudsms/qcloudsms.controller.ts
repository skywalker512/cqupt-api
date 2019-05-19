import { Controller, Inject } from '@nestjs/common';
import { QcloudsmsService } from './qcloudsms.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller('qcloudsms')
export class QcloudsmsController {
  constructor(@Inject(QcloudsmsService) private readonly qcloudsmsService: QcloudsmsService) {}
  @GrpcMethod()
  async sendVerifyCode(payload: { mobile: string}) {
    const {mobile} = payload
    try {
      await this.qcloudsmsService.sendVerifyCode(mobile)
    } catch {
      throw new RpcException({ code: 2004, message: '发送失败' })
    }
    return { code: 200, message: '发送成功' }
  }

  @GrpcMethod()
  async validateCode(payload: { mobile: string, code: string}) {
    const {mobile, code} = payload
    try {
      await this.qcloudsmsService.validateCode(mobile, code)
    } catch(err) {
      throw new RpcException(err.error)
    }
    return { code: 200, message: '验证成功' }
  }

  @GrpcMethod()
  async sendFoundCardNotice(payload: { mobile: string, stuNum: string, locationName: string}) {
    const {mobile, stuNum, locationName} = payload
    try {
      await this.qcloudsmsService.sendFoundCardNotice(mobile, stuNum, locationName)
    } catch {
      throw new RpcException({ code: 2004, message: '发送失败' })
    }
    return { code: 200, message: '发送成功' }
  }
}