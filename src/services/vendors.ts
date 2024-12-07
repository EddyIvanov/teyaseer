import { vendorsPublicApi, vendorsApi } from './api';

import { TGeoJsonFeature } from '@/components/molecules/Map/types/MapPolygon';

export const getVendorsListFilters = () => {
  return vendorsPublicApi.get('/vendors/configs');
};

export const getVendorsList = async (
  searchParams: Record<string, any>,
  offset = 1,
  limit = 10,
  type = '',
  locale = 'ar'
) => {
  const filterDicts: Record<string, any> = {};
  const excludeParams = ['page', 'limit', 'sort', 'order', 'search'];
  searchParams.forEach((value: string, key: any) => {
    if (excludeParams.includes(key)) return;
    filterDicts[`${key}`] = value;
  });
  if (searchParams.get('search')) {
    filterDicts['search'] = searchParams.get('search');
  }
  filterDicts['offset'] = offset * limit - limit;
  filterDicts['limit'] = limit;
  filterDicts['locale'] = locale;
  if (type !== '') {
    const response = await vendorsApi.get(`/vendors/${type}`, {
      params: filterDicts,
    });
    return response;
  }
  return vendorsPublicApi.get('/vendors', {
    params: filterDicts,
  });
};

export const getAuthVendorsListFilters = () => {
  return vendorsApi.get('/vendors/configurations');
};

export const fetchMunicipalities = async (): Promise<{
  data: Array<TGeoJsonFeature>;
}> => {
  const res = await vendorsPublicApi.get('/vendors/map/municipalities');

  return res.data;
};

export const fetchDistricts = async (): Promise<{
  data: Array<TGeoJsonFeature>;
}> => {
  const res = await vendorsPublicApi.get('/vendors/map/districts');
  return res.data;
};
