import SwiperCore from 'swiper';

import { LocalizationTypes } from './localization.type';

export interface IContextReturnType {
  locale: LocalizationTypes;
  is_rtl: boolean;
  swiper?: SwiperCore;
  setSwiper: (swiper: SwiperCore | undefined) => void;
  setContextData: (data: any) => void;
}
export interface IMainContextProps {
  children: React.ReactNode;
}
export interface IMainContextState {
  locale: LocalizationTypes;
  is_rtl: boolean;
  swiper?: SwiperCore;
}
