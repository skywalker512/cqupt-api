import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaiduocrModule } from './baiduocr/baiduocr.module';
import { QcloudsmsModule } from './qcloudsms/qcloudsms.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    keepConnectionAlive: true,
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    database: "cqupt_api",
    entities: ["./**/*.entity.ts"],
    synchronize: true
  }) ,BaiduocrModule, QcloudsmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
