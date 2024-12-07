import Router, { useRouter } from 'next/router';

import commonAr from '../localization/locales/ar/common.json';
import commonEn from '../localization/locales/en/common.json';

import { AR, EN, LocalizationTypes } from '@/types/localization.type';

type Translations = { [key: string]: string };

const useTranslation = (isInsideComponent = true) => {
  let locale: LocalizationTypes | undefined = undefined;

  if (isInsideComponent) {
    locale = useRouter().locale as LocalizationTypes;
  } else {
    locale = Router.locale as LocalizationTypes;
  }

  const getTranslations = (
    localKey: LocalizationTypes | undefined,
    key: string
  ) => {
    let translations: Translations;

    switch (localKey) {
      case EN:
        translations = commonEn as Translations;
        break;
      case AR:
        translations = commonAr as Translations;
        break;
      default:
        translations = {};
        break;
    }

    return translations[key] || key;
  };

  const translate = (key: string): string => {
    return getTranslations(locale, key);
  };

  const translateByLocaleKey = (
    localKey: LocalizationTypes,
    key: string
  ): string => {
    return getTranslations(localKey, key);
  };

  return { t: translate, translateByLocaleKey: translateByLocaleKey };
};

export default useTranslation;
