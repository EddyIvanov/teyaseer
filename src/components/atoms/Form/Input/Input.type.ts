import { ReactNode } from 'react';

import { InputProps as IChakraInputProps } from '@chakra-ui/react';

interface InputProps extends Omit<IChakraInputProps, 'value'> {
  label: string;
  error?: string;
  id: string;
  register?: any;
  prefixComponent?: ReactNode;
  groupClassName?: string;
  value?: string | number | null;
  prefix?: 'phone' | 'currency';
  onClearCB?: () => void;
}
export default InputProps;
