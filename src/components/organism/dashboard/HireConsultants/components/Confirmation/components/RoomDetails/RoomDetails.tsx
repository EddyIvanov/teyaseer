import {
  Card,
  CardBody,
  Flex,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { Text } from '@/components';

const LoanDetails = () => {
  const style = useMultiStyleConfig('Card', {});
  return (
    <Card>
      <CardBody>
        <Text sx={style.bodyMainTitle}>Room Details</Text>
        <Flex
          justify={'space-between'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <VStack alignItems={'start'} gap="20px">
            <Flex gap="5px">
              <Text sx={style.bodyKey}>Bedrooms & Sizes:</Text>
              <VStack alignItems={'start'}>
                <Text sx={style.bodyValue}>Bedroom 1: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bedroom 2: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bedroom 3: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bedroom 4: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bedroom 5: 5m x 5m</Text>
              </VStack>
            </Flex>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>Bathrooms & Sizes:</Text>
              <VStack alignItems={'start'}>
                <Text sx={style.bodyValue}>Bathroom 1: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bathroom 2: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bathroom 3: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bathroom 4: 5m x 5m</Text>
                <Text sx={style.bodyValue}>Bathroom 5: 5m x 5m</Text>
              </VStack>
            </Flex>
          </VStack>
          <VStack alignItems={'start'} gap="20px" minW={'300px'}>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>Kitchen:</Text>
              <Text sx={style.bodyValue}>6m x 6m</Text>
            </Flex>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>Other Rooms:</Text>
              <VStack alignItems={'start'}>
                <Text sx={style.bodyValue}>Maids Room</Text>
                <Text sx={style.bodyValue}>Guest Room</Text>
              </VStack>
            </Flex>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>Level of Finishing:</Text>
              <Text sx={style.bodyValue}>Mid-level Finishing</Text>
            </Flex>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default LoanDetails;
