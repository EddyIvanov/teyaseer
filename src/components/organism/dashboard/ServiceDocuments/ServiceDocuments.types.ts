import {
  Document,
  DocumentCollection,
  StageStepServiceRequest,
} from '../Stages/components/Service/Service.type';

export interface DocumentSampleFile {
  description: string;
  title: string;
  url: string;
}
export interface IDocumentUpload {
  file: File;
  filename: string;
  templateId: string;
  serviceRequestId: string;
}

export type FileUploadStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface IDocumentSelect {
  file: File;
  validationErrors: null | string[];
  uploadStatus?: FileUploadStatus;
}

export interface IDocumentUploadComplete {
  serviceRequestId: string;
  stepExternalId: string;
}

export interface IRequestDocumentUploadFromConsultant
  extends IDocumentUploadComplete {}

export interface ISelectedDocuments {
  file: File;
  validationErrors: null | string[];
  isRequired: Document['isRequired'];
  templateId: Document['sfTemplateId'];
}

export interface IServiceRequestStep {
  completedDescription: string | null;
  completedTitle: string | null;
  ctaText: string | null;
  description: string | null;
  documentsCollection: DocumentCollection;
  inProgressDescription: string | null;
  inProgressTitle: string | null;
  rejectedDescription: string | null;
  rejectedTitle: string | null;
  serviceRequestId: string;
  stageStepServiceRequest: StageStepServiceRequest;
  title: string | null;
  type: string | null;
  url: string;
  urlText: string | null;
}

export interface IServiceRequestStepAndDocumentsInfo {
  caseNumber: string;
  serviceRequestId: string;
  stepTemplateId: string;
  step: IServiceRequestStep[];
  sampleFiles: DocumentSampleFile[];
}

export interface IServiceDocumentsProps {
  serviceRequestId?: string;
  stepTemplateId?: string;
  useAsComponent?: boolean;
  shouldUploadMySelf?: boolean;
  showButtons?: string[];
  onFinish?: () => void;
  guideId?: string;
  showSamples?: boolean;
  hasOptionalUpload?: boolean;
  customTitle?: string;
  customDescription?: string;
}
