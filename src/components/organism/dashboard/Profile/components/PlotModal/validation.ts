import * as yup from 'yup';

export const addContractorSchema = yup.object().shape({
  /*  locationUrl: yup
    .string()
    .test(
      'is-valid-google-maps-link',
      'update_plot_location_error_message',
      value => {
        // test format: https://maps.app.goo.gl/PmJxv9hGUCx6sUsE9
        const formatOneRegex = /^https:\/\/maps\.app\.goo\.gl\/\S+$/;
        // test format:  https://maps.google.com/?q=24.5215362,55.6938202
        const formatTwoRegex =
          /^https:\/\/maps\.google\.com\/\?q=[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

        if (!value) return false;
        return formatOneRegex.test(value) || formatTwoRegex.test(value);
      }
    ), */
  plotId: yup
    .string()
    .required('portal_profile_validation_error_required')
    .max(40, 'validation_error_max_character_40')
    .test(
      'isNotEmpty',
      'portal_profile_validation_error_required',
      value => value?.trim() !== ''
    ),
  communityNumber: yup
    .string()
    .required('portal_profile_validation_error_required')
    .max(40, 'validation_error_max_character_40')
    .test(
      'isNotEmpty',
      'portal_profile_validation_error_required',
      value => value?.trim() !== ''
    ),
});
