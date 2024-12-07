import { TLocationRings } from './map';

export type TCoordinate = { lat: number; lng: number };

export type TGeoJsonFeatureItem = {
  triangleCoords: Array<TCoordinate>;
  strokeColor: string;
  fillColor: string;
  attributes?: TGeoJsonFeature;
};

export type TGeoJsonFeature = {
  nameEnglish: string;
  nameArabic: string;
  countCompletedProjects: number;
  countOngoingProjects: number;
  municipalityCode: string;
  geometry: {
    rings: TLocationRings;
  };
};
