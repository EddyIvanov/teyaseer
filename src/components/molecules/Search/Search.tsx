import { Box, Button, HStack, Input, forwardRef } from '@chakra-ui/react';

import style from './Search.style';
import ISearchProps from './Search.type';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

const Search = forwardRef(
  (
    {
      handleInputChange,
      handleOnSubmitSearch,
      ...restInputProps
    }: ISearchProps,
    ref?: any
  ) => {
    const { t } = useTranslation();
    return (
      <HStack sx={style.searchWrapper}>
        <Button
          aria-label={t('aria_label_search_button')}
          variant="unstyled"
          className="serachIcon"
          onClick={handleOnSubmitSearch}
        >
          <Icon name="search" w="16px" h="16px" />
        </Button>
        <Box height={'100%'} width={'1px'} bg={colors.border} />
        <Input
          ref={ref}
          placeholder={t('support_serach_input_placeholder')}
          onChange={handleInputChange}
          {...restInputProps}
        />
      </HStack>
    );
  }
);

export default Search;
