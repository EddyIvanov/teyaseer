import { Card, CardBody, CardHeader, Heading, Flex } from '@chakra-ui/react';

import { InfoPanelProps } from './InfoPanel.type';

import { Text } from '@/components';

const InfoPanel = ({ title, description, children }: InfoPanelProps) => (
  <Card boxShadow="none" overflow="hidden" borderRadius="none" p="6" border="0">
    <CardHeader>
      <Heading fontSize="2xl">{title}</Heading>
    </CardHeader>

    <CardBody fontSize="small">
      <Text fontSize="small" mb="10">
        {description}
      </Text>
      <Flex gap="25px">{children}</Flex>
    </CardBody>
  </Card>
);

export default InfoPanel;
