import { Filters } from '@/types/ContentFul.type';

export const getSelectedValue = (
  filter: Filters,
  selectedFilters: Record<string, string | number>
) => {
  const value = selectedFilters[filter.fields.fieldName];
  const selectedFilter = filter.fields.filters.find(
    filter =>
      filter.fields.value === value || filter.fields.stringValue === value
  );

  return selectedFilter && value
    ? selectedFilter.fields.label
    : filter.fields.displayName;
};
