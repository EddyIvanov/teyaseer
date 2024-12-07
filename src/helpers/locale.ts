import { AR, EN } from '@/types/localization.type';
import { PREFERRED_EN } from '@/types/user.type';

export type DateTimePattern = 'dd/MM/yyyy' | 'do LLL yyyy';

export const getLocaleCode = (locale: string): string => {
  return locale === PREFERRED_EN ? EN : AR;
};
