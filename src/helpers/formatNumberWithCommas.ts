export const formatNumberWithCommas = (number: number) => {
  if (!number) return 0;
  return number.toLocaleString();
};
