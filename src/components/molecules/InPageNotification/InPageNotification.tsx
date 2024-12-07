import { useContext } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import style from './InPageNotification.style';
import { InPageNotificationProps } from './InPageNotification.type';

import { Icon, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const InPageNotification = ({
  title,
  description,
  rightComponent,
  showSupportServiceRequestInfo = true,
}: InPageNotificationProps) => {
  const { user } = useContext(DashboardContext);
  const { t } = useTranslation();
  return (
    <Flex sx={style.root}>
      <Flex justifyContent="space-between">
        <Box>
          {title && (
            <Flex gap={'5px'}>
              <Icon name="utility" w={'16px'} h={'16px'} color={'#747474'} />
              <Text sx={style.title} as={'span'}>
                {title}
              </Text>
            </Flex>
          )}
          {description && (
            <Text sx={style.description} as={'span'}>
              {description}
            </Text>
          )}
        </Box>
        {rightComponent && !user?.isSupportServiceRequestInitiated && (
          <Box>{rightComponent}</Box>
        )}
      </Flex>
      {showSupportServiceRequestInfo &&
        !user?.isSupportServiceRequestInitiated && (
          <Text mt="2" fontSize={FontSizes.small}>
            <b>
              {user?.userInfo?.projectInfo?.onHoldReason &&
                user.userInfo.projectInfo.onHoldReason}
            </b>
            {user?.userInfo?.projectInfo?.reasonForPuttingOnHold &&
              ` : ${user.userInfo.projectInfo.reasonForPuttingOnHold}`}
          </Text>
        )}
      {showSupportServiceRequestInfo &&
        user?.isSupportServiceRequestInitiated && (
          <Text
            mt="20px"
            fontSize={FontSizes.small}
            fontWeight={FontWeights.bold}
          >
            {t('portal_support_service_request_already_initiated_title')}
          </Text>
        )}
    </Flex>
  );
};

export default InPageNotification;
