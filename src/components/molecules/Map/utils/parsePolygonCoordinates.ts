import { Point, TLocationRings } from '../types/map';

export const parsePolygonCoordinates = (rings: TLocationRings): Point[] => {
  return rings[0].map(([lng, lat]) => ({ lat, lng }));
};
