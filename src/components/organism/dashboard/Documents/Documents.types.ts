import { fileTypes } from './Document.constants';

export type DocumentType = 'report' | 'document';
export type DocumentFileExtension = keyof typeof fileTypes;
export type DocumentStage =
  | 'Onboarding'
  | 'Consultant Procurement'
  | 'Villa Design'
  | 'Contractor Procurement'
  | 'Construction'
  | 'Handover';

export interface IDocument {
  Id: string;
  FileExtension: DocumentFileExtension;
  Title: string;
  CreatedDate: string;
}

export interface IDocuments {
  Id: string;
  Type: DocumentType;
  Stage: DocumentStage;
  DTS_Template_External_ID__c: string;
  files: IDocument[];
}
