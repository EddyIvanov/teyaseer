/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext } from 'react';

import { MarkerProps } from '@react-google-maps/api';

import { Point } from './types/map';

export type MapContextData<T> = {
  map?: google.maps.Map;
  currentPosition: Point | null;
  positionError: string | null;
  selectedMarker: T | null;
  selectedPlace: MarkerProps['position'] | null;
  markers: T[];
  autoComplete: google.maps.places.Autocomplete | null;
  center: google.maps.LatLng | undefined;
  zoom: number | undefined;
  isDragging: boolean;
  setAutoComplete: (
    autocomplete: google.maps.places.Autocomplete | null
  ) => void;
  setSelectedMarker: (markerInfo: T | null) => void;
  setSelectedPlace: (place: MarkerProps['position'] | null) => void;
  setMarkers: (markers: T[]) => void;
  updateCurrentPosition: () => void;
  setIsDragging: (value: boolean) => void;
  isPointVisibleOnMap: (
    point: google.maps.LatLng | google.maps.LatLngLiteral
  ) => boolean;
};

export const MapContextInitValue = {
  map: undefined,
  currentPosition: null,
  positionError: null,
  selectedMarker: null,
  selectedPlace: null,
  markers: [],
  autoComplete: null,
  center: undefined,
  zoom: undefined,
  isDragging: false,
  setAutoComplete: () => null,
  setSelectedMarker: () => null,
  setSelectedPlace: () => null,
  setMarkers: () => null,
  updateCurrentPosition: () => null,
  setIsDragging: () => null,
  isPointVisibleOnMap: () => false,
};
export const MapContext =
  createContext<MapContextData<any>>(MapContextInitValue);

type MapProviderProps<T> = {
  value: MapContextData<T>;
};

export function MapContextProvider<T>({
  children,
  value,
}: PropsWithChildren<MapProviderProps<T>>) {
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMapContext<T>() {
  const context = useContext<MapContextData<T>>(
    MapContext as unknown as React.Context<MapContextData<T>>
  );
  if (!context) {
    throw new Error('useMyContext must be used under MyContextProvider');
  }
  return context;
}
