/* eslint-disable prettier/prettier */
import { Point } from 'geojson';

/* eslint-disable prettier/prettier */
export interface PointInterface {
  id?: number;
  lat?: number;
  long?: number;
  city_name?: string;
  geom?: Point;
}
