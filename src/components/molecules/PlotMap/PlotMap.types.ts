import { TLocationRings } from '../Map/types/map';

export interface PlotMapProps {
  geometry?: TPlotMap['geometry'];
  geometryLoading?: boolean;
}

type TPlotAttributes = {
  PLOTNUMBER: string;
  LATITUDE: number;
  LONGITUDE: number;
  MUNICIPALITY: string;
  DISTRICT: string;
  PLANNEDAREA: number;
  COMMUNITY: string;
  ELMS_PLOTID: string;
};

export type TPlotMap = {
  geometry: { rings: TLocationRings };
  attributes: TPlotAttributes;
};

export type TCoordinates = Array<{ lat: number; lng: number }>;
