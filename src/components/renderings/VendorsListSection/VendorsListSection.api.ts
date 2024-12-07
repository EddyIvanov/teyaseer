import { getVendorsListFilters } from '@/services/vendors';

const getFilters = async (filtersFieldsMapping: Record<string, string>) => {
  try {
    const filtersRes: any = await getVendorsListFilters();

    const filtersObj = filtersRes.data.data;

    for (const key in filtersRes.data.data) {
      filtersObj[key] = {
        ...filtersRes.data.data[key],
        fieldName: filtersFieldsMapping[`vendor_filter_${key}`],
      };
    }

    return filtersObj;
  } catch (e) {
    console.error(e);
  }
};

export { getFilters };
