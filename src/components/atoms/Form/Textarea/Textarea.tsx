import {
  Textarea as ChakraTextarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import cx from 'classnames';

import TextareaProps from './Textarea.type';
import style from '../Input/Input.style';

import { Text } from '@/components';

const Textarea = (props: TextareaProps) => {
  const { label, error, id, value, sx = {}, ...rest } = props;
  return (
    <FormControl sx={{ ...style.root, ...sx }}>
      <FormLabel
        htmlFor={id}
        data-type="textarea"
        className={cx(['inputGroup', error && 'borderError'])}
      >
        <ChakraTextarea
          className={cx(value && 'hasValue')}
          placeholder={label}
          id={id}
          {...rest}
        />
      </FormLabel>
      {error && (
        <Text as="span" className="validationError">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default Textarea;
