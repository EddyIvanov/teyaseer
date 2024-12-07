import React, { useEffect, useState } from 'react';

import {
  Flex,
  InputGroup,
  InputRightElement,
  MenuItemOption,
  MenuOptionGroup,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import styles from './SearchAndFilters.style';
import SearchAndFiltersProps from './SearchAndFilters.type';

import { Icon, MenuDropdown } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const SearchAndFilters = ({ filters }: SearchAndFiltersProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  // Update searchQuery and selectedFilters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.size > 0) {
      const filterParams: any = {};

      for (const [key, value] of searchParams.entries()) {
        filterParams[key] = value;
      }

      const searchString = filterParams.search || '';
      delete filterParams.search;

      if (searchString) {
        setSearchQuery(searchString as string);
      }

      if (Object.keys(filterParams).length) {
        setSelectedFilters({
          ...filterParams,
        });
      }
    }
  }, [window.location.search]);

  const updateBrowserUrl = () => {
    const currentSearchParams: any = {};
    const queryParamsInstance = new URLSearchParams(window.location.search);
    for (const [key, value] of queryParamsInstance.entries()) {
      currentSearchParams[key] = value;
    }

    const queryObj = { ...selectedFilters };

    if (searchQuery) {
      queryObj.search = searchQuery;
    }

    // Update browser url if query params are different
    if (JSON.stringify(currentSearchParams) !== JSON.stringify(queryObj)) {
      router.push(router.pathname, { query: queryObj }, { shallow: true });
    }
  };

  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    if (e.type === 'keydown' && e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    updateBrowserUrl();
  };

  useEffect(() => {
    if (!router.isReady) return;

    updateBrowserUrl();
  }, [selectedFilters]);

  const handleFilterClick = (fieldName: string, option: string) => {
    const newSelectedFilters = {
      ...selectedFilters,
    };
    if (newSelectedFilters[fieldName] !== option) {
      newSelectedFilters[fieldName] = option;
    } else {
      delete newSelectedFilters[fieldName];
    }
    setSelectedFilters(newSelectedFilters);
  };

  return (
    <Flex sx={styles.searchAndFiltersContainer}>
      <Flex __css={styles.searchBox}>
        <InputGroup>
          <Input
            sx={styles.searchInput}
            placeholder={t('search_for_vendor')}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => handleSearchKeydown(e)}
            value={searchQuery}
          />
          <InputRightElement
            onClick={() => handleSearch()}
            sx={styles.searchInputIcon}
          >
            <Icon name="search" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex sx={styles.filtersContainer}>
        {filters &&
          Object.entries(filters).map(([key, value]) => {
            return value.data.length ? (
              <MenuDropdown
                key={key}
                placeholderText={t(value.labelTextContentfulId)}
              >
                <MenuOptionGroup
                  value={selectedFilters[value.fieldName] || ''}
                  type="radio"
                  ringOffset={'100px'}
                >
                  {value.data.map(option => (
                    <MenuItemOption
                      sx={styles.customMenuOption}
                      onClick={() =>
                        handleFilterClick(
                          value.fieldName,
                          option.name.toString()
                        )
                      }
                      key={option.name}
                      value={option.name.toString()}
                    >
                      {t(option.name) || option.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuDropdown>
            ) : null;
          })}
      </Flex>
    </Flex>
  );
};

export default SearchAndFilters;
