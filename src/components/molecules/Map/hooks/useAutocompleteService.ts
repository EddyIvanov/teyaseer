import { useRef } from 'react';

const useAutocompleteService = () => {
  const serviceRef = useRef<google.maps.places.AutocompleteService>();
  if (!serviceRef.current && google?.maps) {
    serviceRef.current = new google.maps.places.AutocompleteService();
  }

  const getQueryPredictions = (
    request: google.maps.places.QueryAutocompletionRequest,
    callback: (
      optional: google.maps.places.QueryAutocompletePrediction[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) => {
    serviceRef.current?.getQueryPredictions(request, callback);
  };

  return { getQueryPredictions };
};

export default useAutocompleteService;
