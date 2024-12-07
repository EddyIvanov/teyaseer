import { StatisticsSectionProps } from '@/components/renderings/StatisticsSection/StatisticsSection.type';

export interface HelpSectionLinksProps {
  actionLinks: StatisticsSectionProps['actionLinks'];
  openModal?: () => void;
}
