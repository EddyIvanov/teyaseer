import { Text as ChakraText, useMultiStyleConfig } from '@chakra-ui/react';

import IText from './Text.type';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const Text = (props: IText) => {
  const styles = useMultiStyleConfig('Text', props);
  const { fontSize = FontSizes.normal, fontWeight = FontWeights.normal } =
    props;
  return (
    <ChakraText
      {...props}
      __css={styles.root}
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {props.children}
    </ChakraText>
  );
};

export default Text;
