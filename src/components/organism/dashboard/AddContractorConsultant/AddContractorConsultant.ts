import {
  TAddContractorTypeReq,
  TAddContractorTypeRes,
} from '@/components/organism/dashboard/AddContractorConsultant/AddContractor.type';
import { usersApi } from '@/services/api';

export const postContractorDetails = async (
  contractorDetails: TAddContractorTypeReq,
  srID?: string,
  stepTemplateID?: string
): Promise<TAddContractorTypeRes> => {
  let apiPath = 'users/service-requests/vendor-prequalification';

  if (srID && stepTemplateID) {
    apiPath += `?SRID=${srID}&StepTemplateID=${stepTemplateID}`;
  }

  const response = await usersApi.post<TAddContractorTypeRes>(
    apiPath,
    contractorDetails
  );
  return response.data;
};
