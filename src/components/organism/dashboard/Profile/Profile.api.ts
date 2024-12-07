import { IAwardedVendors, IMeUpdate } from './Profile.type';

import { usersApi } from '@/services/api';
import { ApiResponse } from '@/types/response.type';

/**
 * Update me API
 * @returns {Promise<ApiResponse>}
 */
export const updateMe = (payload: IMeUpdate): Promise<ApiResponse> => {
  return usersApi.patch('/users/me', payload);
};

/**
 * Create service request for persona of interest
 * @returns {Promise<ApiResponse>}
 */
export const createServiceRequestForPersonOfInterest =
  (): Promise<ApiResponse> => {
    return usersApi.post(
      '/users/service-requests/person-of-determination-meeting'
    );
  };
/**
 * Get awarded vendors
 * @returns {Promise<ApiResponse<IAwardedVendors>>}
 */
export const getAwardedVendors = (): Promise<ApiResponse<IAwardedVendors>> => {
  return usersApi.get('/users/awarded-vendors');
};
