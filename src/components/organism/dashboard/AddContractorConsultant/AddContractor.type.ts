export type TAddContractorTypeReq = {
  companyName: string;
  contactName: string;
  email: string;
  contactPhoneNumber: string;
  landlinePhoneNumber: string;
};

export type TAddContractorTypeRes = {
  data: {
    caseNumber: string;
    serviceRequestId: string;
  };
};
