import { TPlotMap } from '@/components/molecules/PlotMap/PlotMap.types';

export type TPlotLocationResponse = {
  municipalityName: string;
  districtEng: string;
  plotId: string;
  plotNumber: string;
  plannedArea: number;
  latitude: string;
  longitude: string;
};

export type TPlotLocation = {
  latitude: number;
  longitude: number;
  municipalityName?: string | null;
  plotId?: string | null;
  plotNumber?: string | null;
  communityNumber?: string | null;
  plotSize?: number | null;
  district?: string | null;
  geometry?: TPlotMap['geometry'];
};
