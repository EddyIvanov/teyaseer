import { useContext } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { Text } from '@/components';
import { printVillaSize } from '@/helpers/printVilaSize';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { IUser } from '@/types/user.type';

const ConsultantBrief = () => {
  const { t } = useTranslation();
  const style = useMultiStyleConfig('Card', {});
  const { user } = useContext(DashboardContext);
  const { plotInfo } = user?.userInfo || ({} as IUser);

  return (
    <Card>
      <CardHeader>
        <Text sx={style.headerTitle}>
          {t('portal_hire_consultant_confirm_brief_title')}
        </Text>
        <Text sx={style.headerSubtitle}>
          {t('portal_hire_consultant_confirm_brief_subtitle')}
        </Text>
      </CardHeader>
      <CardBody>
        <Text sx={style.bodyMainTitle}>
          {t('portal_hire_consultant_confirm_plot_details_title')}
        </Text>

        <Flex
          justify={'space-between'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <VStack alignItems={'start'} gap="20px">
            <VStack alignItems={'start'}>
              <Text sx={style.bodyKey}>
                {t('portal_hire_consultant_confirm_plot_details_location')}:
              </Text>
              <Text sx={style.bodyValue}>
                {plotInfo?.plotLocation || ''} - {plotInfo?.districtZone || ''}
              </Text>
            </VStack>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>
                {t('portal_hire_consultant_confirm_plot_details_plot_id')}:
              </Text>
              <Text sx={style.bodyValue}>{plotInfo?.id || '-'}</Text>
            </Flex>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>
                {t('portal_hire_consultant_confirm_plot_details_plot_size')}:
              </Text>
              <Text sx={style.bodyValue}>{printVillaSize(plotInfo?.size)}</Text>
            </Flex>
          </VStack>
          <VStack alignItems={'start'} gap="20px" minW={'300px'}>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>
                {t('portal_hire_consultant_confirm_plot_details_municipality')}:
              </Text>
              <Text sx={style.bodyValue}>{plotInfo?.municipality || '-'}</Text>
            </Flex>
            <Flex gap="5px">
              <Text sx={style.bodyKey}>
                {t('portal_hire_consultant_confirm_plot_details_plot_number')}:
              </Text>
              <Text sx={style.bodyValue}>{plotInfo?.number || '-'}</Text>
            </Flex>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ConsultantBrief;
