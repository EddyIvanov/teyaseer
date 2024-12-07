import { format, isValid, formatDistance } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

import { LocalizationTypes } from '@/types/localization.type';

export type DateTimePattern = 'dd/MM/yyyy' | 'do LLL yyyy' | 'd MMM yyyy';

/**
 * Formats a given date string based on the specified pattern.
 * @param {string} date - The date string to be formatted.
 * @param {DateTimePattern} [pattern='dd/MM/yyyy'] - The pattern to format the date. Defaults to 'dd/MM/yyyy'.
 * @returns {string} - The formatted date string.
 *
 * Available date formatting patterns:
 *
 * Pattern: dd/MM/yyyy
 * Example: 30/08/2024
 *
 * Pattern: do LLL yyyy
 * Example: 30th Aug 2024
 */
export const formatDate = (
  date: string,
  pattern: DateTimePattern = 'dd/MM/yyyy',
  locale: LocalizationTypes = 'en'
): string => {
  return isValid(new Date(date))
    ? format(new Date(date), pattern, {
        locale: locale === 'ar' ? ar : enUS,
      })
    : 'Invalid Date';
};

/**
 * Return duration in readable locale string from milliseconds
 * @param {number} durationInMilliseconds - The milliseconds.
 * @param {string} [locale='ar'] - The locale we want to convert the duration. Defaults to 'ar'.
 *
 * Examples:
 *
 * durationInMilliseconds: 40000000
 * locale: en
 * output: about 11 hours
 *
 * durationInMilliseconds: 40000000
 * locale: ar
 * output: 11 ساعة تقريباً
 */
export const durationInLocaleString = (
  durationInMilliseconds: number,
  locale: string = 'ar'
): string => {
  return formatDistance(0, durationInMilliseconds, {
    locale: locale === 'ar' ? ar : enUS,
  });
};
