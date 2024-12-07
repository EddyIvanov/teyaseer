export enum GelocationErrors {
  BROWSER_NOT_SUPPORTED = 'Location not supported by browser',
}

const DEFAULT_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: Number.POSITIVE_INFINITY,
};

const BROWSER_NOT_SUPPORTED_ERROR: GeolocationPositionError = {
  code: 0,
  message: GelocationErrors.BROWSER_NOT_SUPPORTED,
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

export const getCurrentPosition = (
  onSuccess: (position: GeolocationPosition) => void,
  onError: (err: GeolocationPositionError) => void,
  options: PositionOptions = DEFAULT_OPTIONS
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  } else {
    onError(BROWSER_NOT_SUPPORTED_ERROR);
  }
};
