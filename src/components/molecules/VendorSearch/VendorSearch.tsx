import React, { useCallback, useContext, useState } from 'react';

import { Flex, Text, UnorderedList, ListItem } from '@chakra-ui/react';

import style from './VendorSearch.style';
import VendorSearchProps, { Vendor } from './VendorSearch.type';
import Search from '../Search';

import { Icon, Loader } from '@/components';
import { companyName } from '@/helpers/companyNameTranslation';
import { debounce } from '@/helpers/debounce';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const VendorSearch = ({
  onSearchClick,
  searchResults,
  onVendorSelect,
  isLoading,
}: VendorSearchProps) => {
  const { t } = useTranslation();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { locale } = useContext(Context);
  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    if (e.type === 'keydown' && e.key === 'Enter') {
      onSearchClick(input.value);
    }
  };

  const onInputFocusLost = () => {
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const debounceOnHandleSearchInputChange = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length) {
        setShowSearchResults(true);
        onSearchClick(searchQuery);
      } else {
        setShowSearchResults(false);
      }
    }, 500),
    []
  );

  const onFocusSearchInput = useCallback((searchQuery: string) => {
    if (searchQuery.length) {
      setShowSearchResults(true);
    }
  }, []);

  return (
    <Flex flexDirection="column">
      <Flex __css={style.searchInputContainer}>
        <Search
          handleInputChange={e =>
            debounceOnHandleSearchInputChange(e.target.value)
          }
          onKeyDown={e => handleSearchKeydown(e)}
          onFocus={e => onFocusSearchInput(e.target.value)}
          onBlur={onInputFocusLost}
        />
        {showSearchResults && (
          <UnorderedList
            sx={style.searchResultsContainer}
            justifyContent={
              isLoading || searchResults?.length === 0 ? 'center' : undefined
            }
          >
            {isLoading ? (
              <Flex sx={style.searchResultsStateInformation}>
                <Loader thickness="3px" size={'xl'} />
              </Flex>
            ) : searchResults && searchResults.length > 0 ? (
              searchResults.map((company: Vendor) => (
                <ListItem
                  key={company.id}
                  onClick={() => onVendorSelect(company)}
                >
                  <Text sx={style.companyName}>
                    {companyName(company, locale, true)}
                  </Text>
                  {company.location && (
                    <Text sx={style.companyLocation}>{company.location}</Text>
                  )}
                  {company.contactPhoneNumber && (
                    <Flex sx={style.companyContact}>
                      <Icon name="devices" height="20px" />
                      <Text>{company.contactPhoneNumber}</Text>
                    </Flex>
                  )}
                </ListItem>
              ))
            ) : (
              <Flex sx={style.searchResultsStateInformation}>
                {t('portal_not_found')}
              </Flex>
            )}
          </UnorderedList>
        )}
      </Flex>
    </Flex>
  );
};

export default VendorSearch;
