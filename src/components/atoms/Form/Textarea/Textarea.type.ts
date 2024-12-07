import { TextareaProps as IChakraTextareaProps } from '@chakra-ui/react';

interface TextareaProps extends IChakraTextareaProps {
  label?: string;
  error?: string;
}
export default TextareaProps;
