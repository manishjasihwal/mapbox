/* eslint-disable prettier/prettier */
import { Point } from 'geojson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('point')
export class PointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  city_name: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geom: Point;
}
