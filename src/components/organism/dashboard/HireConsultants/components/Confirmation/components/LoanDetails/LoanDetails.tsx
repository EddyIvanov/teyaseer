import { useContext } from 'react';

import {
  Card,
  CardBody,
  Flex,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { IUser } from '@/types/user.type';

const LoanDetails = () => {
  const { t } = useTranslation();
  const style = useMultiStyleConfig('Card', {});
  const { user } = useContext(DashboardContext);
  const { loanInfo } = user?.userInfo || ({} as IUser);

  return (
    <Card>
      <CardBody>
        <Text sx={style.bodyMainTitle}>{t('portal_loan_details_title')}</Text>
        <VStack alignItems={'start'} gap="20px">
          <Flex gap="5px">
            <Text sx={style.bodyKey}>
              {t('portal_loan_details_accepted_loan_amount')}:
            </Text>
            <Text sx={style.bodyValue}>
              {t('portal_AED')}{' '}
              {loanInfo?.acceptedLoanAmount?.toLocaleString() || '-'}
            </Text>
          </Flex>
          <Flex gap="5px">
            <Text sx={style.bodyKey}>
              {t('portal_loan_details_additional_funds')}:
            </Text>
            <Text sx={style.bodyValue}>
              {t('portal_AED')}{' '}
              {loanInfo?.additionalFunds?.toLocaleString() || '-'}
            </Text>
          </Flex>
          <Flex gap="5px">
            <Text sx={style.bodyKey}>
              {t('portal_loan_details_total_funds')}:
            </Text>
            <Text sx={style.bodyValue}>
              {t('portal_AED')} {loanInfo?.totalFunds?.toLocaleString() || '-'}
            </Text>
          </Flex>
          {/* <VStack alignItems={'start'} gap="30px" mt="20px">
            <Text>{t('portal_loan_details_share_additional_title')}</Text>
            <HStack gap="20px">
              <Button variant={'secondary'}>{t('portal_yes')}</Button>
              <Button variant={'primary'}>{t('portal_no')}</Button>
            </HStack>
          </VStack> */}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default LoanDetails;
