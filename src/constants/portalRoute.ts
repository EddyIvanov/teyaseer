// side menu urls
const HOME = '/dashboard';

export const SERVICES = `${HOME}/services`;
const APPOINT_YOUR_CONSULTANT = `${SERVICES}/hire-consultant`;
const APPOINT_YOUR_CONTRACTOR = `${SERVICES}/hire-contractor`;

// child urls
const SELECT_CONSULTANT = `${SERVICES}/select-consultant`;

const SELECT_CONTRACTOR = `${SERVICES}/select-contractor`;

export const PARENT_ROUTE_MAPPING_FOR_HIGHLIGHTING_IN_SIDEBAR: {
  [key: string]: string;
} = {
  [SELECT_CONSULTANT]: APPOINT_YOUR_CONSULTANT,
  [SELECT_CONTRACTOR]: APPOINT_YOUR_CONTRACTOR,
};
