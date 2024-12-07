export type TIconType =
  | 'money'
  | 'plus'
  | 'expandable'
  | 'nonExpandable'
  | 'zoomOutArrow';

export type TVillaRecommendItem = {
  title: string;
  bgSrc: string;
  bedroomText?: string;
  bedroomIconName?: TIconType;
  expandedRoomsText?: string;
  expandedRoomsIconName?: TIconType;
  isRecomend?: boolean;
};
