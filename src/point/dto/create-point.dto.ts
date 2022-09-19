import { Point } from 'geojson';

export class CreatePointDto {
  id?: number;
  lat?: number;
  long?: number;
  city_name?: string;
  geom?: Point;
  profilexyz?: File;
}
