/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';
import { MulterModule } from '@nestjs/platform-express';
import { CsvModule, CsvParser } from 'nest-csv-parser';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointEntity]),
    MulterModule.register({ dest: './uploads' }),
    CsvParser,
    CsvModule,

    // MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
