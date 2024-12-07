import { vendorsApi } from './api';

export const vendorsMap = () => {
  return vendorsApi.get('/vendors/map');
};
