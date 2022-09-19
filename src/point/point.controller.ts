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
import { extname } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

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

  // @Post(':add')
  // @UseInterceptors(FileInterceptor('csv' , ))
  // postAdd(@UploadedFile() profilexyz: Array<Express.Multer.File>): object {
  //   console.log(profilexyz);
  //   return {
  //     message: 'file uploaded',
  //   };
  // }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile() {
    let dataObject = [];
    const csvFile = readFileSync('uploads/1.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      //  transformHeader:(header)=> header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log('csv file', parsedCsv.data);
    dataObject = parsedCsv.data;
    dataObject.filter((element) => {
      console.log('objects', element);

      const newobj = {
        id: element.id,
        lat: element.lat,
        lon: element.lon,
        name: element.name,
      };
      console.log(newobj);

      return this.pointService.createPointOnMap(newobj);
    });
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
