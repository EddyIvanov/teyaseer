import { StatisticsSectionProps } from './StatisticsSection.type';

import { Statistics } from '@/components';

const StatisticsSection = ({
  backgroundImage,
  title,
  infoBoxList,
  actionLinks,
  textColor,
  id,
}: StatisticsSectionProps) => (
  <Statistics
    backgroundImage={backgroundImage?.fields?.file?.url || ''}
    title={title}
    infoBoxList={infoBoxList}
    actionLinks={actionLinks}
    textColor={textColor}
    id={id}
  />
);

export default StatisticsSection;
