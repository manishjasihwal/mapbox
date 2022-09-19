/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  Res,
  Response,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Observable } from 'rxjs';
import { PointInterface } from './entities/post.interface';
import { PointEntity } from './entities/point.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CsvParser } from 'nest-csv-parser';
import * as fs from 'fs';
import * as path from 'path';

@Controller('point')
export class PointController {
  constructor(
    private readonly pointService: PointService,
    private readonly csvParser: CsvParser,
  ) {}

  @Post()
  create(@Body() createPointDto: CreatePointDto): Observable<CreatePointDto> {
    return this.pointService.create(createPointDto);
  }

  @Get()
  findAll(): Observable<PointEntity[]> {
    return this.pointService.findAll();
  }

  @Post(':add')
  @UseInterceptors(FileInterceptor('csv'))
  postAdd(@UploadedFile() profilexyz: Array<Express.Multer.File>): object {
    console.log(profilexyz);
    return {
      message: 'file uploaded',
    };
  }

  @Get('csv')
  csvStream(@Req() req, @Response({ passthrough: true }) res): StreamableFile {
    res.set({
      'Content-Type': 'text/plain',
    });

    const file = path.join('./uploads', 'test.csv');
    const readStream = fs.createReadStream(file);
    readStream.on('data', (chunk) => console.log(chunk)); // <--- the data log gets printed
    readStream.on('end', () => console.log('done'));
    readStream.on('error', (err) => {
      console.error(err);
    });

    return new StreamableFile(readStream);
  }

  // @Get('get/:csv')
  // async seeUploadedFile(@Param('csv') csv, @Res() res) {
  //   return res.sendFile(csv, { root: './uploads' });
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pointService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
  //   return this.pointService.update(+id, updatePointDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pointService.remove(+id);
  // }
}
