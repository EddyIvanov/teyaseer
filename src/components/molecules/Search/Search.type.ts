import { InputProps } from '@chakra-ui/react';

interface ISearchProps extends Omit<InputProps, 'onChange'> {
  handleOnSubmitSearch?: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ISearchProps;
