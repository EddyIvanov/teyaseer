import { useEffect, useState } from 'react';

import { Point } from '../types/map';
import { getCurrentPosition } from '../utils/getCurrentPosition';

const useCurrentPosition = (callOnMount = false) => {
  const [positionError, setPositionError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Point | null>(null);

  const onCurrentPositionSuccess = (geoPosition: GeolocationPosition) => {
    const position = {
      lat: geoPosition.coords.latitude,
      lng: geoPosition.coords.longitude,
    };

    setCurrentPosition(position);
  };

  const onCurrentPositionError = (errorObj: GeolocationPositionError) => {
    setPositionError(errorObj.message);
  };

  const updateCurrentPosition = () => {
    getCurrentPosition(onCurrentPositionSuccess, onCurrentPositionError);
  };

  useEffect(() => {
    if (callOnMount) {
      updateCurrentPosition();
    }
  }, []);

  return { currentPosition, updateCurrentPosition, positionError };
};

export default useCurrentPosition;
