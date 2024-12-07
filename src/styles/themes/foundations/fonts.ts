import localFont from 'next/font/local';

export const primaryFont = localFont({
  src: [
    {
      path: '../../../assets/fonts/almarai/Almarai-Light.ttf',
      weight: '300',
    },
    {
      path: '../../../assets/fonts/almarai/Almarai-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../assets/fonts/almarai/Almarai-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--primary-font',
});

export const secondaryFont = localFont({
  src: [
    {
      path: '../../../assets/fonts/poppins/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../../../assets/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../assets/fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../../assets/fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--secondary-font',
});
