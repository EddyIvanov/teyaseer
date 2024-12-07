import { AxiosResponse } from 'axios';

import {
  IDocumentUpload,
  IDocumentUploadComplete,
  IRequestDocumentUploadFromConsultant,
  IServiceRequestStepAndDocumentsInfo,
} from './ServiceDocuments.types';

import { usersApi } from '@/services/api';
import { ApiResponse } from '@/types/response.type';

/**
 * Upload documents
 * @param payload
 * @returns {Promise<AxiosResponse>}
 */
export const uploadDocuments = (
  payload: IDocumentUpload
): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', payload.file);
  formData.append('filename', payload.filename);
  formData.append('templateId', payload.templateId);
  formData.append('serviceRequestId', payload.serviceRequestId);
  return usersApi.post(`/users/documents/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const completeDocumentUpload = (
  payload: IDocumentUploadComplete
): Promise<AxiosResponse> => {
  return usersApi.post(
    `/users/service-requests/document-upload-complete`,
    payload
  );
};

export const requestDocumentUploadFromConsultant = (
  payload: IRequestDocumentUploadFromConsultant
): Promise<AxiosResponse> => {
  return usersApi.post(
    `/users/documents/upload/request-from-consultant`,
    payload
  );
};

export const getServiceRequestStepAndDocumentsInfo = (
  serviceRequestId: string,
  stepTemplateId: string,
  locale: string
): Promise<ApiResponse<IServiceRequestStepAndDocumentsInfo>> => {
  return usersApi.get(
    `/users/me/service-requests/${serviceRequestId}?stepTemplateId=${stepTemplateId}&locale=${locale}`
  );
};
