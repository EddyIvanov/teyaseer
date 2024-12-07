import { DocumentFileExtension } from '../../../Documents/Documents.types';
import { DocumentSampleFile } from '../../../ServiceDocuments/ServiceDocuments.types';

import { IconNames } from '@/components/atoms/Icon/Icon';

export enum ServiceRequestStatusEnum {
  CLOSED = 'Closed',
  IN_PROGRESS = 'In Progress',
  DEACTIVATED = 'Deactivated',
}

export type File = {
  Id: string;
  FileExtension: DocumentFileExtension;
  Title: string;
  CreatedDate: string;
};

export type Document = {
  name: string;
  sfTemplateId: string;
  canBeUploadedByCustomer: boolean;
  id?: string;
  status?: 'Uploaded' | 'Pending';
  files?: File[];
  stage: string;
  isRequired: boolean;
  order: null | number;
  sampleFile: DocumentSampleFile;
};

export type StageStepServiceRequest = {
  id: string;
  link: string;
  name: string;
  order: number;
  responsible: 'customer' | 'non-customer';
  status: 'Pending' | 'Complete';
  templateExternalId: string;
  title: string;
  description: string;
  ctaText: string;
  date: string;
  lastModifiedDate: string;
  optionalTransitions?: { items: StepOptionalTransition[]; total: number };
  url: string;
  urlText: string;
};

export type DocumentCollection = {
  total: number;
  items: Document[];
};

export type ServiceRequestFlow = {
  title: string;
  description: string;
  type: 'meeting' | 'generic' | 'others';
  url: string;
  urlText: string;
  stageStepServiceRequest: StageStepServiceRequest;
  documentsCollection: DocumentCollection;
  icon: IconNames;
  inProgressTitle: string;
};

export type PrerequisiteStage = {
  name: string;
  title: string;
  description: string;
  sfStageName: string;
  slug: string;
  stageOrder: number;
};

export type CustomerUploadDocumentStep = {
  link: string | null;
  name: string;
  order: number | null;
  responsible: 'customer' | 'non-customer';
  templateExternalId: string;
  status: 'Pending' | 'Extend';
};

export type ServiceRequests = {
  id: string;
  name: string;
  serviceRequestOptionType: string;
  detailsUrlSlug: string;
  serviceRedirectUrl: string;
  status: string;
  dtsRequestStatusC: string;
  dtsRequestSubtypeC: string;
  dtsTemplateExternalIdC: string;
  recordTypeDeveloperName: string;
  serviceRequestType:
    | 'generic'
    | 'consultant'
    | 'contractor'
    | 'predesignedVilla'
    | 'calculator';
  documentsCollection: {
    total: number;
    items: Document[];
  };
  serviceRequestFlowCollection: {
    total: number;
    items: ServiceRequestFlow[];
  };
  prerequisiteStage: PrerequisiteStage;
  prerequisiteType: 'completed' | 'inProgress';
  prerequisitesNotMetErrorMessage: string;
  customerUploadDocumentStep: CustomerUploadDocumentStep;
  instances: ServiceRequestsInstances[];
  areServiceRequestPrerequisitesMet: boolean;
  canBeTriggeredByCustomer: boolean;
  maxUses: number;
  daysItTakeForService: number;
  legacySr: boolean;
};

export type ServiceRequestsInstances = {
  id: string;
  name: string;
  serviceRequestOptionType: string;
  detailsUrlSlug: string;
  serviceRedirectUrl: string;
  status: ServiceRequestStatusEnum;
  dtsRequestSubtypeC: string;
  dtsTemplateExternalIdC: string;
  recordTypeDeveloperName: string;
  serviceRequestType:
    | 'generic'
    | 'consultant'
    | 'contractor'
    | 'predesignedVilla'
    | 'calculator';
  documentsCollection: {
    total: number;
    items: Document[];
  };

  serviceRequestFlowCollection: {
    total: number;
    items: ServiceRequestFlow[];
  };
  serviceRequestStepLogs: {
    total: number;
    items: ServiceRequestFlow[];
  };
  prerequisiteStage: PrerequisiteStage;
  prerequisiteType: 'completed' | 'inProgress';
  customerUploadDocumentStep: CustomerUploadDocumentStep;
  caseNumber: string;
  closedDate: string;
  createdDate: string;
  deactivationReason: string;
  maxPercentageOfCompletedSteps: number;
  legacySr: boolean;
};

export type ServiceData = {
  title: string;
  description: string;
  name: string;
  order: number;
  slug: string;
  serviceRequestsCollection: {
    total: number;
    items: ServiceRequests[];
  };
};

export type ActivateServiceRequestResponse = {
  data: {
    caseNumber: string;
    serviceRequestId: string;
    redirectUrl: string;
  };
};

export type StepOptionalTransition = {
  displayTitle: string;
  cta: string;
  targetStatus: string;
  icon?: IconNames;
};
