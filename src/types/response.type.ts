import { AxiosResponse, HttpStatusCode } from 'axios';

import { StageData } from '@/components/organism/dashboard/Stages/Stage.type';

export interface ApiResponse<T = unknown> extends AxiosResponse {
  data: Record<'data', T>;
}

export type ServiceStagesResponse = {
  isSalesforceDataAvailable: boolean;
  sfServiceCollection: {
    items: StageData[];
    total: number;
  };
};
export interface ServiceApiResponse<T = unknown> extends AxiosResponse {
  data: Record<'data', T>;
}

export type UsersApiErrorResponseType = {
  error: {
    statusCode: HttpStatusCode;
    message: string;
    errorName: string;
    details: {
      errorCode: {
        appKey: string;
      };
    };
    path: string;
    requestId: string;
    timestamp: string;
  };
};

export type ProjectSummaryResponse = {
  lastPhaseName: string;
  dateOfCompletion: string;
  durationInMS: number;
  numberOfTriggeredServices: number;
  totalFundAmount: number;
};

export type HelpFormResponse = {
  data: {
    caseNumber: string;
    serviceRequestId: string;
  };
};
