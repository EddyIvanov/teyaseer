export const MAP = {
  ZOOM_LEVEL: 13,
  FOCUSED_RADIUS: 50000,
};

export enum MapDefaults {
  CENTER_LAT = 24.4539, // Abu Dhabi center lat
  CENTER_LNG = 54.3773, // Abu Dhabi center lng
  VENDOR_MAP_CENTER_LAT = 24.13472496700004, // center lat of 3 regions Abu Dhabi, Al ain, Al Dhafra
  VENDOR_MAP_CENTER_LNG = 53.73685957100005, // center lng of 3 regions Abu Dhabi, Al ain, Al Dhafra
  ZOOM_DESKTOP = 8,
  ZOOM_CURRENT_LOCATION = 15,
  ZOOM_POLYGON_LOCATION = 17,
  ZOOM_SELECTED_LOCATION = 10,
  ZOOM_MAX = 16,
  ZOOM_MIN = 7,
}
export const DEFAULT_MAP_OPTIONS = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  disableDefaultUI: true,
};

export const CLUSTER_OPTIONS = {
  imagePath: '/mapClusterIcons/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder,
  imageExtension: 'svg',
  // styles: [{ textColor: '#fff', width: 53, height: 53, url: '' }],
};

export type Libraries = ('drawing' | 'geometry' | 'places' | 'visualization')[];

export const DEFAULT_LIBRARIES: Libraries = ['places'];

// the padding (space) around the bounds borders
export const BOUNDS_PADDING = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};
