import { Test, TestingModule } from '@nestjs/testing';
import { BaiduocrService } from './baiduocr.service';

describe('BaiduocrService', () => {
  let service: BaiduocrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaiduocrService],
    }).compile();

    service = module.get<BaiduocrService>(BaiduocrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
