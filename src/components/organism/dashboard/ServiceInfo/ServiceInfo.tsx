import { Flex } from '@chakra-ui/react';

import { IServiceInfoProps } from './ServiceInfo.type';
import ServiceInfoList from './components/ServiceInfoList';
import ServiceInfoTitle from './components/ServiceInfoTitle';

const ServiceInfo = ({
  infoData,
  title,
  defaultCollapsed,
}: IServiceInfoProps) => (
  <Flex width="100%" gap="20px" direction="column">
    <ServiceInfoTitle title={title} defaultCollapsed={defaultCollapsed}>
      <ServiceInfoList infoData={infoData} />
    </ServiceInfoTitle>
  </Flex>
);

export default ServiceInfo;
