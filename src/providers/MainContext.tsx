import React, { createContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import SwiperCore from 'swiper';

import BackToTop from '@/components/atoms/BackToTop/BackToTop';
import { LocalizationTypes } from '@/types/localization.type';
import {
  IContextReturnType,
  IMainContextProps,
  IMainContextState,
} from '@/types/mainContext.type';

export const Context = createContext<IContextReturnType>(
  {} as IContextReturnType
);

const MainContext = (props: IMainContextProps) => {
  const router = useRouter();
  const { locale } = router as { locale: undefined | LocalizationTypes };
  const { children } = props;
  const [state, setState] = React.useState<IMainContextState>({
    is_rtl: locale === 'ar',
    locale: locale || 'ar',
    swiper: undefined,
  });

  const setSwiper = (swiper: SwiperCore | undefined) => {
    setState(prev => ({ ...prev, swiper }));
  };

  const setContextData = (data: any) => {
    setState(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    // Whenever Locale change in path it change the html dir and locale and save it in context state
    localStorage.setItem('locale', locale || 'ar');
    const html: HTMLElement | null = document.getElementById('html');
    setState(prev => ({
      ...prev,
      is_rtl: locale === 'ar',
      locale: locale || 'ar',
    }));

    if (html) {
      html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    }
  }, [locale]);

  return (
    <Context.Provider
      value={{
        ...state,
        setSwiper,
        setContextData,
      }}
    >
      {children}
      <BackToTop />
    </Context.Provider>
  );
};

export default MainContext;
