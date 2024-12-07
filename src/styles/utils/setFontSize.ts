/**
 * @param lowerBound is the lowest font size in rem
 * @param higherBound is the highest font size in rem
 */
export function setFontSize(minFontSize: string, maxFontSize: string): string {
  const ratioForVh = (Number(maxFontSize.split('rem')[0]) * 1000) / 1118;
  const ratioForVw = (Number(minFontSize.split('rem')[0]) * 1000) / 400;
  return `clamp(${minFontSize}, min(${ratioForVh}vh, ${ratioForVw}vw), ${maxFontSize})`;
}
