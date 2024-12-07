import { useRef } from 'react';

type GeocoderHashmap = {
  [placeId: string]: google.maps.places.PlaceResult;
};

const usePlaceService = (map: google.maps.Map | undefined) => {
  const serviceRef = useRef<google.maps.places.PlacesService>();
  const records = useRef<GeocoderHashmap>({});

  if (!serviceRef.current && google?.maps && map) {
    serviceRef.current = new google.maps.places.PlacesService(map);
  }

  const getDetails = async (
    placeId: string,
    callback: (
      place: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) => {
    if (records.current?.[placeId]) {
      callback(
        records.current[placeId],
        google.maps.places.PlacesServiceStatus.OK
      );
      return;
    }

    const request = {
      placeId,
      fields: ['name', 'formatted_address', 'place_id', 'geometry'],
    };

    serviceRef.current?.getDetails(
      request,
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (place) {
          records.current[placeId] = place;
          callback(place, status);
        } else {
          callback(place, status);
        }
      }
    );
  };

  return { getDetails };
};

export default usePlaceService;
