import { Test, TestingModule } from '@nestjs/testing';
import { QcloudsmsService } from './qcloudsms.service';

describe('QcloudsmsService', () => {
  let service: QcloudsmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcloudsmsService],
    }).compile();

    service = module.get<QcloudsmsService>(QcloudsmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
