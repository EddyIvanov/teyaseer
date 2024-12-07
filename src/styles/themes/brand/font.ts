import fontSizes from './fontSizes';
import letterSpacings from './letterSpacings';
import lineHeights from './lineHeights';

const font: { [key: string]: { [key: string]: string | number } } = {
  size: fontSizes,
  lineHeight: lineHeights,
  letterSpacing: letterSpacings,
};

export default font;
