/// this are the samples Pending, Complete, Reschedule, No Show, Meeting Held, Rejected, Deactivated, Extend, Request Meeting, Customer Unresponsive
export const convertToCamelCase = (str: string) => {
  const strArray = str.split(' ');
  const camelCaseArray = strArray.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return camelCaseArray.join('');
};
