import axios, {
  AxiosError,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import Router from 'next/router';

import { envVars } from '@/configs/env';
import { getAccessToken } from '@/helpers/session';
import {
  createCustomStandAloneToast,
  fetchAppKeyValueFromErrorResponse,
} from '@/helpers/utils';
import { UsersApiErrorResponseType } from '@/types/response.type';

/**
 * public website vendor microservice
 */
export const vendorsPublicApi = axios.create({
  baseURL: envVars.API.VENDORS_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Users microservice
 */
export const usersApi = axios.create({
  baseURL: envVars.API.USERS_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Vendors microservice
 */
export const vendorsApi = axios.create({
  baseURL: envVars.API.VENDORS_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Cost calculator microservice
 */
export const costCalculatorApi = axios.create({
  baseURL: envVars.API.COST_CALCULATOR_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Handle 500 error and show toast
 * @param {InternalAxiosRequestConfig} request
 */
const handleErrorInterceptor500 = async (error: UsersApiErrorResponseType) => {
  const title = fetchAppKeyValueFromErrorResponse(error);
  createCustomStandAloneToast(title);
};

/**
 * Client side API interceptor
 * @param {InternalAxiosRequestConfig} request
 */
const handleClientApiInterceptor = async (
  request: InternalAxiosRequestConfig
) => {
  const accessToken = await getAccessToken();

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
};

/**
 * Public api interceptor
 * @param {InternalAxiosRequestConfig} request
 */
const publicApiInterceptor = async (request: InternalAxiosRequestConfig) => {
  return request;
};

/**
 * Global api interceptor
 * @param {InternalAxiosRequestConfig} request
 */
const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  return handleClientApiInterceptor(request);
};

/**
 * Public API error interceptor
 * @param {AxiosError} axiosError
 */
const publicErrorInterceptor = async (
  axiosError: AxiosError<UsersApiErrorResponseType>
) => {
  if (axiosError.response?.status === HttpStatusCode.InternalServerError) {
    handleErrorInterceptor500(axiosError.response.data);
  }

  return Promise.reject(axiosError);
};

/**
 * Customer Portal API error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = async (
  axiosError: AxiosError<UsersApiErrorResponseType>
) => {
  if (axiosError.response?.status === HttpStatusCode.Unauthorized) {
    Router.push({
      pathname: `/logout`,
      query: { redirectLink: window.location.pathname },
    });
    return Promise.reject(axiosError);
  }

  if (axiosError.response?.status === HttpStatusCode.InternalServerError) {
    handleErrorInterceptor500(axiosError.response.data);
  }

  return Promise.reject(axiosError);
};

/**
 * Global API error interceptor
 * @param {AxiosError} axiosError
 */
const usersApiErrorInterceptor = async (
  axiosError: AxiosError<UsersApiErrorResponseType>
) => {
  if (axiosError.response?.status === HttpStatusCode.Unauthorized) {
    Router.push({
      pathname: `/logout`,
      query: { redirectLink: window.location.pathname },
    });
    return Promise.reject(axiosError);
  }

  if (
    axiosError.response?.status === HttpStatusCode.BadRequest ||
    axiosError.response?.status === HttpStatusCode.InternalServerError
  ) {
    const title = fetchAppKeyValueFromErrorResponse(axiosError.response.data);
    createCustomStandAloneToast(title);
  }

  return Promise.reject(axiosError);
};

// Request interceptors
usersApi.interceptors.request.use(apiInterceptor);
vendorsApi.interceptors.request.use(apiInterceptor);
costCalculatorApi.interceptors.request.use(apiInterceptor);
vendorsPublicApi.interceptors.request.use(publicApiInterceptor);

// Response interceptors
usersApi.interceptors.response.use(res => res, usersApiErrorInterceptor);
vendorsApi.interceptors.response.use(res => res, errorInterceptor);
costCalculatorApi.interceptors.response.use(res => res, errorInterceptor);
vendorsPublicApi.interceptors.response.use(res => res, publicErrorInterceptor);
