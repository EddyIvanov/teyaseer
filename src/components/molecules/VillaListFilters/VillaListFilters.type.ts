import { Filters } from '@/types/ContentFul.type';

interface VillaListFiltersProps {
  filters: Filters[];
  selectedFilters: Record<string, string | number>;
  onFilterClick: (fieldName: string, option: any) => void;
}

export default VillaListFiltersProps;
