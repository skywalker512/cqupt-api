import { Test, TestingModule } from '@nestjs/testing';
import { BaiduocrController } from './baiduocr.controller';

describe('Baiduocr Controller', () => {
  let controller: BaiduocrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaiduocrController],
    }).compile();

    controller = module.get<BaiduocrController>(BaiduocrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
