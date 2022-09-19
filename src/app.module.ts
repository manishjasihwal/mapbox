/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointController } from './point/point.controller';
import { PointModule } from './point/point.module';
import { PointService } from './point/point.service';
import { ConfigModule } from '@nestjs/config';
// import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    // CsvModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // entities: [FeedPostEntity, Address],
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    PointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
