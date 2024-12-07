import * as yup from 'yup';

import {
  EMAIL_VALIDATE_REGEX,
  UAE_MOBILE_NUMBER_WITHOUT_W_COUNTRY_CODE,
} from '@/components/molecules/LeadCustomerForm/LeadCustomerForm.constants';

export const addContractorSchema = yup.object().shape({
  companyName: yup
    .string()
    .required('portal_profile_validation_error_required'),
  contactName: yup
    .string()
    .required('portal_profile_validation_error_required'),
  email: yup
    .string()
    .required('portal_profile_validation_error_required')
    .matches(EMAIL_VALIDATE_REGEX, 'validation_error_email'),
  contactPhoneNumber: yup
    .string()
    .required('portal_profile_validation_error_required')
    .matches(
      UAE_MOBILE_NUMBER_WITHOUT_W_COUNTRY_CODE,
      'portal_profile_validation_error_invalid_phone_number'
    ),
  landlinePhoneNumber: yup
    .string()
    .required('portal_profile_validation_error_required')
    .matches(
      UAE_MOBILE_NUMBER_WITHOUT_W_COUNTRY_CODE,
      'portal_profile_validation_error_invalid_landline_number'
    ),
});
