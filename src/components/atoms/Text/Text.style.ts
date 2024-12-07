import colors from '@/styles/themes/brand/colors';

const baseStyle = () => ({
  color: colors.text.dark,
});

const variants = {
  semiTransparent: {
    color: colors.text.semiTransparent,
  },
};

const theme = { baseStyle, variants };

export default theme;
