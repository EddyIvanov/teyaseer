import { extendTheme } from '@chakra-ui/react';

import extendedTheme from '@/styles/themes';
import { primaryFont, secondaryFont } from '@/styles/themes/foundations/fonts';

const rtlFont: { [key: string]: string } = {
  body: primaryFont.style.fontFamily,
  heading: primaryFont.style.fontFamily,
};

const ltrFont: { [key: string]: string } = {
  body: secondaryFont.style.fontFamily,
  heading: secondaryFont.style.fontFamily,
};

export const getTheme = (lang?: string) => {
  return {
    ...extendTheme(extendedTheme),
    fonts: lang === 'ar' ? rtlFont : ltrFont,
  };
};
