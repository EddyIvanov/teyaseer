import axios, { AxiosResponse } from 'axios';

import { usersApi } from './api';

import { TProjectCompletionRes } from '@/components/molecules/JourneyProgress/JourneyProgress.types';
import { TPlotMap } from '@/components/molecules/PlotMap/PlotMap.types';
import { TPendingSurveyResponse } from '@/components/molecules/SurveyModal/SurveyModal.type';
import { IConsultantType } from '@/components/organism/dashboard/HireConsultants/Consultants.type';
import { TPlotLocationResponse } from '@/components/organism/dashboard/Profile/components/PlotModal/types';
import { StageData } from '@/components/organism/dashboard/Stages/Stage.type';
import { ActivateServiceRequestResponse } from '@/components/organism/dashboard/Stages/components/Service/Service.type';
import { envVars } from '@/configs/env';
import { LocalizationTypes } from '@/types/localization.type';
import { ServiceRequestPayload } from '@/types/requests.type';
import {
  ApiResponse,
  HelpFormResponse,
  ProjectSummaryResponse,
  ServiceApiResponse,
  ServiceStagesResponse,
} from '@/types/response.type';
import { IMe, IUserLoginPreCheck } from '@/types/user.type';

/**
 * Login pre check API
 * @param {string} accessToken
 * @returns {Promise<ApiResponse<IUserLoginPreCheck>>}
 */
export const loginPreCheck = async (
  accessToken: string
): Promise<ApiResponse<IUserLoginPreCheck>> => {
  return axios({
    method: 'GET',
    url: `${envVars.API.USERS_BASE_URL}/users/login-prechecks`,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Get me API
 * @returns {Promise<ApiResponse<IMe>>}
 */
export const getMe = (): Promise<ApiResponse<IMe>> => {
  return usersApi.get('/users/me');
};

/**
 * Get stages api
 * @returns {Promise<ApiResponse<ServiceStagesResponse>>}
 */
export const getServiceStages = (
  locale: string
): Promise<ApiResponse<ServiceStagesResponse>> =>
  usersApi.get('/users/stages?locale=' + locale);

/**
 * Get current stage api
 * @returns {Promise<ApiResponse<ServiceStagesResponse>>}
 */
export const getCurrentStageApi = (
  locale: string,
  controller = new AbortController()
): Promise<ApiResponse<ServiceStagesResponse>> =>
  usersApi.get('/users/me/current-stage?locale=' + locale, {
    signal: controller?.signal,
  });

/**
 * Get stages api for specific stage
 * @returns {Promise<ApiResponse<ServiceStagesResponse>>}
 */
export const getStageByName = (
  stageName: string,
  locale: string,
  controller?: AbortController
): Promise<ApiResponse<ServiceStagesResponse>> =>
  usersApi.get(`/users/stages?stageName=${stageName}&locale=${locale}`, {
    signal: controller?.signal,
  });

// start hire consultants api
/**
 * generic request for active service requests
 * @returns {Promise<AxiosResponse<ActivateServiceRequestResponse>>}
 */
export const activateServiceRequest = (
  payload: ServiceRequestPayload
  // TODO: need to add return type after it is set from BE
): Promise<AxiosResponse<ActivateServiceRequestResponse>> =>
  usersApi.post('/users/service-requests', payload);

/**
 * Get bidderList
 * Post create service request
 * @returns {Promise<ServiceApiResponse<StageData[]>>}
 */
export const createConsultantServiceRequest = (): Promise<
  ServiceApiResponse<IConsultantType[]>
> => usersApi.post(`/users/service-requests/consultant-procurement`);

/**
 * Get bidderList
 * @returns {Promise<ServiceApiResponse<IConsultantType[]>>}
 */
export const getConsultantBidderList = (
  servicesReqId: string,
  requiredCount: number = 10
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.get(
    `/users/bidders-list?type=consultants&serviceRequestId=${servicesReqId}&requiredCount=${requiredCount}`
  );

/**
 * Get bidderList
 * @returns {Promise<ServiceApiResponse<IConsultantType[]>>}
 */
export const sendConsultantProcurementVendors = (
  servicesReqId: string,
  vendorsIds: string[]
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.post(
    `users/service-requests/consultant-procurement/shortlisted-vendors`,
    {
      clientIds: vendorsIds,
      serviceRequestId: servicesReqId,
    }
  );
// End hire consultants api

// Start hire contractors api
/**
 * Post create service request
 * @returns {Promise<ServiceApiResponse<StageData[]>>}
 */
export const createContractorServiceRequest = (): Promise<
  ServiceApiResponse<IConsultantType[]>
> =>
  usersApi.post(`/users/service-requests/contractor-procurement/bidder-list`);

/**
 * Get bidderList
 * @returns {Promise<ServiceApiResponse<IConsultantType[]>>}
 */
export const getContractorsBidderList = (
  servicesReqId: string,
  requiredCount: number = 10
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.get(
    `/users/bidders-list?type=contractors&serviceRequestId=${servicesReqId}&requiredCount=${requiredCount}`
  );

// End hire contractors api

export const sendContractorProcurementVendors = (
  servicesReqId: string,
  vendorsIds: string[]
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.post(
    `users/service-requests/contractor-procurement/shortlisted-vendors`,
    {
      vendorSalesforceIds: vendorsIds,
      serviceRequestId: servicesReqId,
    }
  );

/**
 * Patch ME api
 * TODO: need to remove from here and use profile.api.ts instead
 */
export const updateProfileData = (data: any): Promise<any> =>
  usersApi.patch(`/users/me`, data);

export const getSelectedConsultantList = (
  servicesReqId: string
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.get(
    `/users/service-requests/procurements/shortlisted-vendors/submitted?serviceRequestId=${servicesReqId}`
  );

export const setAwardedConsultant = (
  vendorId: string,
  serviceRequestId: string
): Promise<any> =>
  usersApi.post(`/users/service-requests/consultant-procurement/award-vendor`, {
    vendorId,
    serviceRequestId,
  });

export const getSelectedContractorList = (
  servicesReqId: string
): Promise<ServiceApiResponse<IConsultantType[]>> =>
  usersApi.get(
    `/users/service-requests/procurements/shortlisted-vendors/submitted?serviceRequestId=${servicesReqId}`
  );

export const setAwardedContractor = (
  vendorId: string,
  serviceRequestId: string
): Promise<any> =>
  usersApi.post(`/users/service-requests/contractor-procurement/award-vendor`, {
    vendorId,
    serviceRequestId,
  });

export const getBidderListConfiguration = () =>
  usersApi.get('/users/service-requests/bidder-list-configurations');

export const getConsultantDocumentTemplates = (serviceId: string) =>
  usersApi.get(
    `/users/me/service-requests/${serviceId}?stepTemplateId=T__Appointment_of_Consultant__TD__Additional_Design_Document&locale=en`
  );

export const getProjectCompletionData =
  async (): Promise<TProjectCompletionRes> => {
    const res = await usersApi.get('/users/project-percentage');

    return res.data?.data;
  };

export const getPlotDetailsData = async (): Promise<TPlotMap> => {
  const res = await usersApi.get('/users/me/plot');

  return res.data?.data;
};

/**
 * Get plot details by plotId and communityNumber
 * @param {string} plotId
 * @param {string} communityNumber
 * @param {LocalizationTypes} locale
 * @returns {Promise<ApiResponse<{ data: TPlotMap }>}
 */
export const getPlotDetailsBySitePlan = async (
  plotId: string,
  communityNumber: string,
  locale: LocalizationTypes
): Promise<TPlotMap> => {
  const res = await usersApi.patch('/users/update-user-plot-by-site-plan', {
    plotId,
    communityNumber,
    locale,
    save: false,
  });

  return res.data?.data;
};

/**
 * Get activated serivces list in home page
 * @param {string} plotId
 * @param {string} communityNumber
 * @param {LocalizationTypes} locale
 * @returns {Promise<ApiResponse<null>>} // returns 204 no data
 */
export const updatePlotDetails = async (
  plotId: string,
  communityNumber: string,
  locale: LocalizationTypes
): Promise<ApiResponse<null>> => {
  const res = await usersApi.patch('/users/update-user-plot-by-site-plan', {
    plotId,
    communityNumber,
    locale,
    save: true,
  });

  return res;
};

/**
 * Get activated serivces list in home page
 * @returns {Promise<ApiResponse<{ data: StageData[] }>}
 */
export const getActivatedServices = (
  locale: string,
  controller?: AbortController
): Promise<AxiosResponse<{ data: StageData[] }>> =>
  usersApi.get(`/users/me/active-services?locale=${locale}`, {
    signal: controller?.signal,
  });

/**
 * Get project summary data
 * @returns { Promise<AxiosResponse<{ data: ProjectSummaryResponse }>> }
 */
export const getProjectSummary = (): Promise<
  AxiosResponse<{ data: ProjectSummaryResponse }>
> => {
  return usersApi.get('/users/summary');
};

/**
 * generic request for activate optional step
 * @param {string} srID, represents service request ID
 * @param {string} stepTargetStatus
 * @param {boolean} override
 * @returns {Promise<AxiosResponse<ActivateServiceRequestResponse>>}
 */
//TODO: need to update return type
export const activateOptionalStep = (
  srID: string,
  stepTargetStatus: string,
  override = false
): Promise<AxiosResponse<ActivateServiceRequestResponse>> =>
  usersApi.patch(`/users/service-requests/steps/${srID}?override=${override}`, {
    stepTargetStatus: stepTargetStatus,
  });

export const ActivateOnHoldProject = async (): Promise<any> => {
  const res = await usersApi.patch('users/me/activate-on-hold-project');
  return res.data;
};

/**
 * Not used anymore
 * @param locationLink
 * @returns
 */
export const getPlotLocationByLink = async (
  locationLink: string
): Promise<TPlotLocationResponse> => {
  const res = await usersApi.get(`/users/url-plot-details?url=${locationLink}`);

  return res.data;
};

/**
 * Not used anymore
 * @param locationLink
 * @returns
 */
export const getPlotLocationByCoordination = async (
  lat: number,
  lang: number
): Promise<TPlotLocationResponse> => {
  const res = await usersApi.get(
    `/users/plot-details?latitude=${lat}&longitude=${lang}`
  );

  return res.data;
};

export const getUserPendingSurvey =
  async (): Promise<TPendingSurveyResponse> => {
    const res = await usersApi.get(`/users/me/pending-survey`);
    return res.data;
  };

export const skipCurrentSurvey = async (): Promise<AxiosResponse> => {
  const res = await usersApi.post(`/users/surveys/skip`);
  return res;
};

export const submitHelpForms = async (payload: {
  service: string;
  reason: string;
}): Promise<AxiosResponse<HelpFormResponse>> => {
  return await usersApi.post('/users/service-requests/help-forms', payload);
};

export const restartServiceRequest = async (): Promise<AxiosResponse> => {
  return await usersApi.post('/users/service-requests/restart-project');
};
