import { LeadCustomerPayload } from './LeadCustomerForm.type';

import { usersApi } from '@/services/api';
import { ApiResponse } from '@/types/response.type';

export const registerLeadCustomer = (
  payload: LeadCustomerPayload
): Promise<ApiResponse> => {
  return usersApi.post('/users/public/salesforce/lead', payload);
};
