export const extractPlotNumber = (
  plotNumber: string | undefined | null
): [string, string] => {
  if (!plotNumber) {
    return ['', ''];
  }

  const lastUnderscoreIndex = plotNumber.lastIndexOf('_');

  if (lastUnderscoreIndex === -1) {
    return ['', ''];
  }

  const communityNumber = plotNumber.substring(0, lastUnderscoreIndex);
  const plotNum = plotNumber.substring(lastUnderscoreIndex + 1);

  return [communityNumber, plotNum];
};
