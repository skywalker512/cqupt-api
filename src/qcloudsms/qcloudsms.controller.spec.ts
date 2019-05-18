import { Test, TestingModule } from '@nestjs/testing';
import { QcloudsmsController } from './qcloudsms.controller';

describe('Qcloudsms Controller', () => {
  let controller: QcloudsmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcloudsmsController],
    }).compile();

    controller = module.get<QcloudsmsController>(QcloudsmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
