import { AxiosResponse } from 'axios';

import { IDocument, IDocuments } from './Documents.types';

import { usersApi } from '@/services/api';

/**
 * Get documents
 * @returns {Promise<AxiosResponse<IDocuments>>}
 */
export const getDocuments = (
  locale: string
): Promise<AxiosResponse<IDocuments[]>> => {
  return usersApi.get('/users/documents', {
    params: {
      locale,
    },
  });
};

/**
 * Get document by id
 * @returns {Promise<AxiosResponse>}
 */
export const getDocument = (id: IDocument['Id']): Promise<AxiosResponse> => {
  return usersApi.get(`/users/documents/${id}`, { responseType: 'blob' });
};
