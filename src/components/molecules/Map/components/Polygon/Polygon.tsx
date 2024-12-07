import React from 'react';

import { Polygon as GMapPolygon, PolygonProps } from '@react-google-maps/api';

import { mapConfig } from '@/components/molecules/Map/mapConfig';

const Polygon = ({ ...rest }: PolygonProps) => {
  return <GMapPolygon options={mapConfig.polygon} {...rest} />;
};

export default Polygon;
