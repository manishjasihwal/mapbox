import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PointService } from './point/point.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
