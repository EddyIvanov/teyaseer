import { LocalizationTypes } from '@/types/localization.type';

const printCompanyNames = (primaryName?: string, secondaryName?: string) => {
  return `${
    primaryName
      ? primaryName +
        `${secondaryName && secondaryName !== primaryName ? ' / ' : ''}`
      : ''
  }${secondaryName ? secondaryName : ''}`;
};

const printCompanyName = (primaryName?: string, secondaryName?: string) => {
  return primaryName || secondaryName || '-';
};

const showSingleName = (item: any, locale: LocalizationTypes) => {
  if (locale === 'ar') {
    return printCompanyName(item?.companyNameAr, item?.companyName);
  } else {
    return printCompanyName(item?.companyName, item?.companyNameAr);
  }
};

const showMultipleName = (item: any, locale: LocalizationTypes) => {
  if (locale === 'ar') {
    return printCompanyNames(item?.companyNameAr, item?.companyName);
  } else {
    return printCompanyNames(item?.companyName, item?.companyNameAr);
  }
};

export const companyName = (
  item: any,
  locale: LocalizationTypes,
  showBoth: boolean = false
) => {
  if (showBoth) {
    return showMultipleName(item, locale);
  } else {
    return showSingleName(item, locale);
  }
};
