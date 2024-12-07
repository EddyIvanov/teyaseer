import { TCoordinates } from '@/components/molecules/PlotMap/PlotMap.types';

export const calculateCentroid = (path: TCoordinates) => {
  let latSum = 0;
  let lngSum = 0;
  const length = path.length;

  path.forEach(vertex => {
    latSum += vertex.lat;
    lngSum += vertex.lng;
  });

  return {
    lat: latSum / length,
    lng: lngSum / length,
  };
};
