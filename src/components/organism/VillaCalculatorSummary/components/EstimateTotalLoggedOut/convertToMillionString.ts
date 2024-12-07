import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';

export const convertToMillionString = (value: number, postfix: string) => {
  if (value < 1000000) return formatNumberWithCommas(value);
  return `${(value / 1000000).toFixed(3)} ${postfix}`;
};
