export const PREFERRED_LANG_COOKIE = `teyaseer_portal_user_preferred_lang`;
/**
 * We don't clear REMIND_LATER_SURVEY_COOKIE and SKIP_UPDATE_PLOT_LOCATION_COOKIE on logout, because forgerock clear them.
 * If ever Forgerock fix this, then we need to cleear them manually during Logout
 * */
export const REMIND_LATER_SURVEY_COOKIE = `teyaseer.remindSurvey`;
export const SKIP_UPDATE_PLOT_LOCATION_COOKIE = `teyaseer.skipUpdatingPlotLocation`;
