import { IFormattedCostBreakdownItem } from 'teyaseer-calculator-engine';

export const generateGradient = (
  data: Array<IFormattedCostBreakdownItem>,
  total: number
) => {
  const gradientParts: Array<string> = [];
  let currentPercentage = 0;

  data.forEach(({ result }, i) => {
    const start = currentPercentage;
    const percentageOfTotal = (result / total) * 100;
    const end = start + percentageOfTotal;
    gradientParts.push(`${pieChartColorPalette[i]} ${start}% ${end}%`);
    currentPercentage = end;
  });

  return { gradient: `conic-gradient(${gradientParts.join(', ')})` };
};

export const pieChartColorPalette = [
  '#F3D878',
  '#F19A37',
  '#0978AB',
  '#EFEFEF',
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#FF9999',
  '#66B2FF',
  '#FFD700',
  '#7FFFD4',
  '#C71585',
  '#FFCE56',
  '#4BC0C0',
  '#FF9999',
  '#66B2FF',
  '#FFD700',
  '#7FFFD4',
  '#C71585',
];
