import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import {
  GoogleMap,
  GoogleMapProps,
  LoadScriptProps,
  MarkerClusterer,
  MarkerProps,
  useJsApiLoader,
} from '@react-google-maps/api';
import cx from 'classnames';

import style from './Map.styled';
import { MapContextProvider } from './MapContext';
import InfoBox from './components/InfoBox/InfoBox';
import Marker from './components/Marker/Marker';
import Polygon from './components/Polygon/Polygon';
import {
  BOUNDS_PADDING,
  CLUSTER_OPTIONS,
  DEFAULT_LIBRARIES,
  DEFAULT_MAP_OPTIONS,
  Libraries,
  MAP,
  MapDefaults,
} from './constants/Map.constants';
import { useCurrentPosition } from './hooks';
import { DefaultMarkerType } from './types/map';

import { Icon } from '@/components';
import { MapLoadingOverlay } from '@/components/molecules/Map/components/MapLoadingOverlay/MapLoadingOverlay';
import {
  TGeoJsonFeature,
  TGeoJsonFeatureItem,
} from '@/components/molecules/Map/types/MapPolygon';
import { envVars } from '@/configs/env';

interface IProps<T> extends Omit<GoogleMapProps, 'children'> {
  className?: string;
  showCurrentLocation?: boolean;
  renderChildrenOutTheMap?: ReactNode;
  libraries?: Libraries;
  lazyLoading?: ReactNode;
  renderInfoBox?: (item: T) => ReactNode;
  polygons?: { [key: string]: TGeoJsonFeatureItem };
  renderPolygonInfoDetails?: (data: TGeoJsonFeature) => ReactNode;
  onZoomCB?: (zoom: number) => void;
  isLoading?: boolean;
  onMarkerDragEnd?: (event: google.maps.MapMouseEvent) => void;
  markerOnDragStart?: (event: google.maps.MapMouseEvent) => void;
}

const Map = <T extends DefaultMarkerType>({
  className,
  showCurrentLocation,
  renderChildrenOutTheMap,
  polygons,
  renderInfoBox,
  libraries,
  lazyLoading,
  onZoomCB,
  isLoading,
  renderPolygonInfoDetails,
  onMarkerDragEnd,
  markerOnDragStart,
  options,
  ...rest
}: IProps<T>) => {
  const { mapTypeId } = rest;
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [center, setCenter] = useState<google.maps.LatLng | undefined>(
    undefined
  );
  const [zoom, setZoom] = useState<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const { currentPosition, updateCurrentPosition, positionError } =
    useCurrentPosition(showCurrentLocation);
  const [selectedMarker, setSelectedMarker] = useState<T | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<
    MarkerProps['position'] | null
  >(null);
  const [markers, setMarkers] = useState<T[]>([]);

  const [infoPosition, setInfoPosition] = useState<
    | {
        lat: number;
        lng: number;
        attributes?: TGeoJsonFeature;
      }
    | undefined
  >(undefined);

  const handlePolygonClick = (
    event: google.maps.MapMouseEvent,
    locationInfo?: TGeoJsonFeature
  ) => {
    if (event?.latLng?.lat() && event?.latLng.lng()) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setInfoPosition({
        lat,
        lng,
        ...(locationInfo && { attributes: locationInfo }),
      });

      map?.panTo({ lat, lng });
    }
  };

  const closeInfoWindow = () => setInfoPosition(undefined);

  const googleMapsLibraries: LoadScriptProps['libraries'] =
    libraries || DEFAULT_LIBRARIES;
  const googleMapsOptions = { ...DEFAULT_MAP_OPTIONS, ...options };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: envVars.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  const isSelectedMarker = (marker: DefaultMarkerType): boolean => {
    return (
      marker.longitude === selectedMarker?.longitude &&
      marker.latitude === selectedMarker?.latitude
    );
  };

  useEffect(() => {
    if (map && currentPosition) {
      map.panTo(currentPosition);
      map.setZoom(MAP.ZOOM_LEVEL);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (map && selectedPlace) {
      map.panTo(selectedPlace);
      map.setZoom(MapDefaults.ZOOM_SELECTED_LOCATION);
    }
  }, [map, selectedPlace]);

  const onMarkerClick = (marker: T) => {
    setSelectedMarker(marker);
  };

  const onMapLoad = (googleMap: google.maps.Map) => {
    setMap(googleMap);
  };

  const onZoomChanged = () => {
    if (map) {
      const zoom = map.getZoom();
      if (!zoom) return;
      onZoomCB && onZoomCB(zoom);
      setZoom(zoom);
    }
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onCenterChanged = () => {
    if (map) {
      setCenter(map.getCenter());
    }
  };

  const onClick = () => {
    setInfoPosition(undefined);
  };

  const isPointVisibleOnMap = (
    point: google.maps.LatLng | google.maps.LatLngLiteral
  ) => {
    return !!map?.getBounds()?.contains(point);
  };

  const onCloseInfoBox = () => {
    setSelectedMarker(null);
  };

  const getBoundsFromPolygon = (polygons: {
    [key: string]: TGeoJsonFeatureItem;
  }) => {
    const bounds = new window.google.maps.LatLngBounds();
    Object.keys(polygons).forEach((item: any) => {
      polygons[item].triangleCoords.forEach(point => {
        bounds.extend(point);
      });
    });

    return bounds;
  };

  // does not work with `mapTypeId={'terrain'}` passed as prop to `Map`
  useEffect(() => {
    if (map && mapTypeId) {
      map?.setMapTypeId(mapTypeId);
    }
  }, [map, mapTypeId]);

  useEffect(() => {
    if (map && polygons && Object.keys(polygons).length > 0) {
      const bounds = getBoundsFromPolygon(polygons);

      map.fitBounds(bounds, BOUNDS_PADDING);
    }
  }, [polygons]);

  const context = useMemo(
    () => ({
      map,
      currentPosition,
      positionError,
      selectedMarker,
      markers,
      autoComplete,
      selectedPlace,
      center,
      zoom,
      isDragging,
      setIsDragging,
      updateCurrentPosition,
      setSelectedMarker,
      setSelectedPlace,
      setMarkers,
      setAutoComplete,
      isPointVisibleOnMap,
    }),
    [
      map,
      currentPosition,
      selectedMarker,
      markers,
      autoComplete,
      selectedPlace,
      center,
      zoom,
      isDragging,
    ]
  );

  if (!isLoaded) {
    return (
      <Flex className={className} __css={style.root}>
        {lazyLoading || (
          <Icon name="mapPlaceholder" className="m-map__lazyLoading" />
        )}
      </Flex>
    );
  }

  return (
    <Flex __css={style.root}>
      <MapContextProvider value={context}>
        {renderChildrenOutTheMap}
        <GoogleMap
          mapContainerClassName={cx(['m-map__googleMap', className])}
          onLoad={onMapLoad}
          options={googleMapsOptions}
          onCenterChanged={onCenterChanged}
          onZoomChanged={onZoomChanged}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onClick={onClick}
          {...rest}
        >
          {isLoading && <MapLoadingOverlay />}

          {infoPosition &&
            renderPolygonInfoDetails &&
            infoPosition?.attributes && (
              <InfoBox
                disableAutoPan
                position={infoPosition as any}
                closeInfoBox={closeInfoWindow}
              >
                {renderPolygonInfoDetails(infoPosition?.attributes)}
              </InfoBox>
            )}

          {polygons &&
            Object.keys(polygons).map((item, i) => {
              return (
                <Polygon
                  key={i}
                  {...(renderPolygonInfoDetails && {
                    onClick: (e: google.maps.MapMouseEvent) =>
                      handlePolygonClick(e, polygons[item].attributes),
                  })}
                  paths={polygons[item].triangleCoords}
                  options={{
                    strokeColor: polygons[item].strokeColor,
                    fillColor: polygons[item].fillColor,
                  }}
                />
              );
            })}
          {markers.length > 0 && (
            <MarkerClusterer
              maxZoom={MapDefaults.ZOOM_DESKTOP - 1}
              options={CLUSTER_OPTIONS}
            >
              {clusterer => (
                <>
                  {markers.map((marker, index) => (
                    <Marker
                      {...(onMarkerDragEnd && { draggable: true })}
                      key={index}
                      position={{
                        lat: Number(marker.latitude),
                        lng: Number(marker.longitude),
                      }}
                      clusterer={clusterer}
                      onClick={() => onMarkerClick(marker)}
                      onDragEnd={onMarkerDragEnd}
                      onDragStart={markerOnDragStart}
                      scaledSize={{
                        width: 34,
                        height: 40,
                        equals: () => true,
                      }}
                      customIcon={
                        isSelectedMarker(marker) ? (
                          <Icon
                            name={
                              marker.markerType === 'secondary'
                                ? 'markerSelectedSecondary'
                                : 'markerSelected'
                            }
                          />
                        ) : (
                          <Icon
                            name={
                              marker.markerType === 'secondary'
                                ? 'markerSecondary'
                                : 'marker'
                            }
                            border="solid red"
                          />
                        )
                      }
                    >
                      {isSelectedMarker(marker) && renderInfoBox ? (
                        <InfoBox closeInfoBox={onCloseInfoBox}>
                          {renderInfoBox(marker)}
                        </InfoBox>
                      ) : (
                        <></>
                      )}
                    </Marker>
                  ))}
                </>
              )}
            </MarkerClusterer>
          )}

          {currentPosition && (
            <Marker
              key="currentPosition"
              position={{ ...currentPosition }}
              customIcon={<Icon name="gpsPosition" />}
              scaledSize={new google.maps.Size(82, 82)}
              anchor={new google.maps.Point(41, 41)}
            />
          )}

          {selectedPlace && (
            <Marker
              key="selectedPlace"
              position={selectedPlace}
              customIcon={<Icon name="poiSelected" />}
            />
          )}
        </GoogleMap>
      </MapContextProvider>
    </Flex>
  );
};

export default Map;
