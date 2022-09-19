/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CsvParser } from 'nest-csv-parser';
// import { CsvParser } from 'nest-csv-parser';
import { from, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PointEntity } from './entities/point.entity';
import { PointInterface } from './entities/post.interface';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(PointEntity)
    private readonly pointRepository: Repository<PointEntity>,
    private readonly csvParser: CsvParser, // private readonly csvParser: CsvParser,
  ) {}

  // async parse() {
  //   // Create stream from file (or get it from S3)
  //   const stream = fs.createReadStream(__dirname + '/some.csv');
  //   const entities: PointEntity[] = await csvParser.parse(stream, PointEntity);

  //   return entities;
  // }

  create(createPointDto: CreatePointDto): Observable<CreatePointDto> {
    return from(this.pointRepository.save(createPointDto));
  }

  createcsv(createPointDto: CreatePointDto): Observable<CreatePointDto> {
    return from(this.pointRepository.save(createPointDto));
  }

  findAll(): Observable<PointEntity[]> {
    return from(this.pointRepository.find());
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
