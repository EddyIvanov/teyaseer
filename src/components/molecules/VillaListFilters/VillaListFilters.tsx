import { Flex, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react';

import style from './VillaListFilters.style';
import VillaListFiltersProps from './VillaListFilters.type';
import { getSelectedValue } from './VillaListFilters.utils';

import { MenuDropdown } from '@/components';

const VillaListFilters = ({
  filters,
  selectedFilters,
  onFilterClick,
}: VillaListFiltersProps) => {
  return (
    <Flex sx={style.filtersContainer}>
      <Flex sx={style.filtersInnerContainer}>
        {filters.map(filter => (
          <Flex key={filter.sys.id}>
            <MenuDropdown
              placeholderText={getSelectedValue(filter, selectedFilters)}
            >
              <MenuOptionGroup
                value={
                  selectedFilters[filter.fields.fieldName]
                    ? selectedFilters[filter.fields.fieldName].toString()
                    : ''
                }
                type="radio"
              >
                {!!filter.fields.filters &&
                  filter.fields.filters.map(option => {
                    const optionValue = option.fields.value
                      ? option.fields.value.toString()
                      : option.fields.stringValue;

                    return (
                      <MenuItemOption
                        sx={style.customMenuOption}
                        onClick={() =>
                          onFilterClick(filter.fields.fieldName, option)
                        }
                        key={option.sys.id}
                        value={optionValue}
                      >
                        {option.fields.label}
                      </MenuItemOption>
                    );
                  })}
              </MenuOptionGroup>
            </MenuDropdown>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default VillaListFilters;
