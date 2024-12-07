import { TGeoJsonFeatureItem } from '@/components/molecules/Map/types/MapPolygon';
import { RichTextType } from '@/types/ContentFul.type';

export type VendorMapSectionProps = {
  mainTitle: RichTextType;
  id?: string;
  vendorsMapCenter: google.maps.LatLng | undefined;
  vendorsMapData: Record<string, TGeoJsonFeatureItem>;
};
