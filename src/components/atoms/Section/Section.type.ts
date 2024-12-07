import { BoxProps as IChakraBoxProps } from '@chakra-ui/react';

interface SectionProps extends IChakraBoxProps {
  children: React.ReactNode;
  height?: string;
}
export default SectionProps;
