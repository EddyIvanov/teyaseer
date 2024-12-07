const awesomegrid: { [key: string]: any } = {
  mediaQuery: 'only screen',
  columns: {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  gutterWidth: {
    xs: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  paddingWidth: {
    xs: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  container: {
    xs: 'full', // 'full' = max-width: 100%
    sm: 'full', // 'full' = max-width: 100%
    md: 'full', // 'full' = max-width: 100%
    lg: 'full', // 'full' = max-width: 100%
    xl: 'full', // 'full' = max-width: 100%
  },
  breakpoints: {
    xs: 1,
    sm: 32, // 512px
    md: 48, // 768px
    lg: 64, // 1024px
    xl: 120, // 1920px
  },
};

export default awesomegrid;
