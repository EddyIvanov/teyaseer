import {
  TCoordinate,
  TGeoJsonFeature,
  TGeoJsonFeatureItem,
} from '@/components/molecules/Map/types/MapPolygon';
import { parsePolygonCoordinates } from '@/components/molecules/Map/utils/parsePolygonCoordinates';
import colors from '@/styles/themes/brand/colors';

const colorsMap: { [key: string]: string } = {
  ADM: colors.primary,
  AAM: colors.success,
  WRM: colors.secondary,
};

const calculateEdges = (coords: Array<TCoordinate>) => {
  return coords.reduce(
    (extremes, { lat, lng }) => ({
      minLat: Math.min(lat, extremes.minLat),
      maxLat: Math.max(lat, extremes.maxLat),
      minLng: Math.min(lng, extremes.minLng),
      maxLng: Math.max(lng, extremes.maxLng),
    }),
    { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity }
  );
};

export const parseDistrictsToPolygons = (
  districtsCluster: Array<TGeoJsonFeature>,
  generateBoundingBoxCenter: boolean = false
) => {
  if (!Array.isArray(districtsCluster) || !districtsCluster.length) return {};

  let minLatOuter = Infinity,
    maxLatOuter = -Infinity,
    minLngOuter = Infinity,
    maxLngOuter = -Infinity;

  let boundingBoxCenter;

  const data = districtsCluster.reduce(
    (acc, district) => {
      const { nameEnglish, geometry, municipalityCode } = district;

      const triangleCoords = parsePolygonCoordinates(geometry.rings);

      const { minLat, maxLat, minLng, maxLng } = calculateEdges(triangleCoords);

      if (!acc[nameEnglish]) {
        acc[nameEnglish] = {
          triangleCoords: [],
          strokeColor: colors.mapBorderColor,
          fillColor: colorsMap[municipalityCode],
          attributes: district,
        };
      }

      acc[district.nameEnglish].triangleCoords.push(...triangleCoords);

      if (generateBoundingBoxCenter) {
        if (minLat < minLatOuter) minLatOuter = minLat;
        if (maxLat > maxLatOuter) maxLatOuter = maxLat;
        if (minLng < minLngOuter) minLngOuter = minLng;
        if (maxLng > maxLngOuter) maxLngOuter = maxLng;
      }
      return acc;
    },
    {} as Record<string, TGeoJsonFeatureItem>
  );

  if (generateBoundingBoxCenter) {
    boundingBoxCenter = {
      lat: (minLatOuter + maxLatOuter) / 2,
      lng: (minLngOuter + maxLngOuter) / 2,
    };
  }

  return { data, boundingBoxCenter };
};
