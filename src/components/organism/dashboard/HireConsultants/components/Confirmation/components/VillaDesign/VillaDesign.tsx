import {
  Card,
  CardBody,
  Flex,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { Text } from '@/components';
import { T_ParseVillaDetails } from '@/components/organism/dashboard/Profile/Profile.type';
import useTranslation from '@/hooks/useTranslate';

const VillaDesign = (props: T_ParseVillaDetails) => {
  const { villaTitle, villaStyle, villaSize, bedrooms, bathrooms } = props;
  const style = useMultiStyleConfig('Card', {});
  const { t } = useTranslation();

  return (
    <Card>
      <CardBody>
        <Text sx={style.bodyMainTitle}>{t('portal_villa_design')}</Text>
        <Flex
          justify={'space-between'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <VStack alignItems={'start'} gap="20px">
            {villaTitle && (
              <Flex gap="5px">
                <Text sx={style.bodyKey}>{t('portal_villa_title')}:</Text>
                <Text sx={style.bodyValue}>{villaTitle}</Text>
              </Flex>
            )}
            {villaStyle && (
              <Flex gap="5px">
                <Text sx={style.bodyKey}>{t('portal_villa_style')}:</Text>
                <Text sx={style.bodyValue}>{villaStyle}</Text>
              </Flex>
            )}
            {villaSize && (
              <Flex gap="5px">
                <Text sx={style.bodyKey}> {t('portal_villa_size')}:</Text>
                <Text sx={style.bodyValue}>{villaSize}</Text>
              </Flex>
            )}
          </VStack>
          <VStack alignItems={'start'} gap="20px" minW={'300px'}>
            {bedrooms && (
              <Flex gap="5px">
                <Text sx={style.bodyKey}>{t('portal_bedrooms')}:</Text>
                <Text sx={style.bodyValue}>{bedrooms}</Text>
              </Flex>
            )}
            {bathrooms && (
              <Flex gap="5px">
                <Text sx={style.bodyKey}>{t('portal_bathrooms')}:</Text>
                <Text sx={style.bodyValue}>{bathrooms}</Text>
              </Flex>
            )}
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default VillaDesign;
