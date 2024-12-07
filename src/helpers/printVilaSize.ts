import { formatNumberWithCommas } from './formatNumberWithCommas';

import useTranslation from '@/hooks/useTranslate';

export const printVillaSize = (size?: number | null) => {
  const sqm = useTranslation().t('sqm');
  const printedValue = size ? `${formatNumberWithCommas(size)} ${sqm}` : '-';

  return printedValue;
};
