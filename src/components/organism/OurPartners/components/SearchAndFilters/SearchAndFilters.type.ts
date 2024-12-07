interface SearchAndFiltersProps {
  filters: Record<
    string,
    {
      labelTextContentfulId: string;
      fieldName: string;
      data: {
        name: string;
      }[];
    }
  >;
}

export default SearchAndFiltersProps;
