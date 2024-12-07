import React from 'react';

import {
  Input as ChakraInput,
  Flex,
  FormControl,
  FormLabel,
  Box,
  InputRightElement,
  InputGroup,
  forwardRef,
} from '@chakra-ui/react';
import cx from 'classnames';
import classNames from 'classnames';

import style from './Input.style';
import InputProps from './Input.type';

import { Text, Icon } from '@/components';
import { UAE_COUNTRY_CODE } from '@/components/molecules/LeadCustomerForm/LeadCustomerForm.constants';
import useTranslation from '@/hooks/useTranslate';

const Input = forwardRef(
  (
    {
      label,
      error,
      id,
      value,
      register = undefined,
      prefixComponent,
      prefix,
      groupClassName,
      onClearCB,
      sx = {},
      ...rest
    }: InputProps,
    ref?: any
  ) => {
    const { isDisabled } = rest;
    const { t } = useTranslation();

    return (
      <FormControl sx={{ ...style.root, ...sx }}>
        <FormLabel
          htmlFor={id}
          className={cx(['inputGroup', groupClassName, error && 'borderError'])}
        >
          {prefixComponent && (
            <Box className={'prefixComponent'}>{prefixComponent}</Box>
          )}
          {prefix && (
            <Box className={classNames(`prefixComponent`, prefix)}>
              {prefix === 'phone' && (
                <>
                  <Icon name="uaeFlag" w={'24px'} h="15px" />
                  <span>+{UAE_COUNTRY_CODE}</span>
                </>
              )}
              {prefix === 'currency' && <span>{t('portal_AED')}</span>}
            </Box>
          )}
          <Flex w={'100%'}>
            {label && value && (
              <Text as="span" className="inputLabel">
                {label}
              </Text>
            )}
            <InputGroup>
              {onClearCB && value && (
                <InputRightElement
                  {...(!isDisabled && { onClick: onClearCB })}
                  className={'clear-input-icon'}
                >
                  <Icon name={'close'} w="10px" h="10px" />
                </InputRightElement>
              )}
              <ChakraInput
                ref={ref}
                className={cx(value && 'hasValue')}
                placeholder={label}
                id={id}
                type="text"
                {...(register ? { ...register(id) } : null)}
                {...rest}
              />
            </InputGroup>
          </Flex>
        </FormLabel>
        {error && (
          <Text as="span" className="validationError">
            {error}
          </Text>
        )}
      </FormControl>
    );
  }
);

export default Input;
