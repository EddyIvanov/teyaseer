import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import { Point } from '../Map/types/map';

import Map, { MapDefaults } from '@/components/molecules/Map';
import { calculateCentroid } from '@/components/molecules/Map/utils/calculateCentroid';
import { parsePolygonCoordinates } from '@/components/molecules/Map/utils/parsePolygonCoordinates';
import { NoDataInfoOverlay } from '@/components/molecules/PlotMap/NoDataInfoOverlay';
import {
  PlotMapProps,
  TPlotMap,
} from '@/components/molecules/PlotMap/PlotMap.types';
import { useGetData } from '@/hooks/useGetData';
import { getPlotDetailsData } from '@/services/users';
import colors from '@/styles/themes/brand/colors';

const MAP_OPTIONS = {
  mapTypeId: 'satellite',
};

export const PlotMap = ({ geometry, geometryLoading }: PlotMapProps) => {
  const { fetchData, data, isLoading } = useGetData<TPlotMap>();
  const [center, setCenter] = useState({
    lat: MapDefaults.CENTER_LAT,
    lng: MapDefaults.CENTER_LNG,
  });
  const [polygonCoordinates, setPolygonCoordinates] = useState<
    Point[] | undefined
  >();

  useEffect(() => {
    fetchData(getPlotDetailsData);
  }, []);

  useEffect(() => {
    if (geometry) {
      setVariables(geometry);
    } else {
      setPolygonCoordinates([]);
    }
  }, [geometry]);

  useEffect(() => {
    if (data && data.geometry && data.geometry.rings.length > 0) {
      setVariables(data.geometry);
    }
  }, [data]);

  const setVariables = (geometry: TPlotMap['geometry']) => {
    const polygonCoordinates = parsePolygonCoordinates(geometry.rings);
    const center = polygonCoordinates
      ? calculateCentroid(polygonCoordinates)
      : { lat: MapDefaults.CENTER_LAT, lng: MapDefaults.CENTER_LNG };
    setPolygonCoordinates(polygonCoordinates);
    setCenter(center);
  };

  const hasData =
    (data && data.geometry && data.geometry.rings.length > 0) ||
    polygonCoordinates;

  return (
    <Box position={'relative'} w={'100%'} h={'100%'}>
      <Map
        isLoading={isLoading || geometryLoading}
        {...(!isLoading &&
          !hasData && {
            renderChildrenOutTheMap: <NoDataInfoOverlay />,
          })}
        center={center}
        zoom={
          polygonCoordinates
            ? MapDefaults.ZOOM_POLYGON_LOCATION
            : MapDefaults.ZOOM_SELECTED_LOCATION
        }
        options={MAP_OPTIONS}
        {...(polygonCoordinates && {
          polygons: {
            plot: {
              strokeColor: colors.mapSatelliteStrokeColor,
              fillColor: colors.mapSatelliteFillColor,
              triangleCoords: polygonCoordinates,
            },
          },
        })}
      />
    </Box>
  );
};
