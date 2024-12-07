export type Point = {
  lat: number;
  lng: number;
};

export type DefaultMarkerType = {
  latitude: number;
  longitude: number;
  markerType?: 'primary' | 'secondary';
};

export type TLocationRings = Array<Array<Array<number>>>;
