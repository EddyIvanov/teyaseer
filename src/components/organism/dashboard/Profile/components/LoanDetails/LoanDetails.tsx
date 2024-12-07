import { useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

import AdditionalFundUpdateModal from '../AdditionalFundUpdateModal/AdditionalFundUpdateModal';

import useTranslation from '@/hooks/useTranslate';
import { ILoanInfo } from '@/types/user.type';

interface ILoanDetails {
  loanInfo: ILoanInfo;
}

const LoanDetails = ({ loanInfo }: ILoanDetails) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(state => !state);
  };
  return (
    <>
      <Card
        boxShadow="none"
        overflow="hidden"
        borderRadius="none"
        border="0"
        p="6"
      >
        <CardHeader>
          <Heading fontSize="2xl">{t('portal_profile_loan_details')}</Heading>
        </CardHeader>

        <CardBody fontSize="small">
          <List spacing={4}>
            <ListItem>
              <strong>{t('portal_profile_accepted_loan_amount')}:</strong>{' '}
              {t('portal_AED')}{' '}
              {loanInfo.acceptedLoanAmount?.toLocaleString() || 0}
            </ListItem>
            <ListItem display="flex" gap="4px">
              <strong>{t('portal_profile_additional_funds')}:</strong>{' '}
              {t('portal_AED')}{' '}
              {loanInfo.additionalFunds?.toLocaleString() || 0}
              <Button onClick={() => setIsModalOpen(true)} variant="link">
                {t('portal_edit')}
              </Button>
            </ListItem>
            <ListItem>
              <strong>{t('portal_profile_total_funds')}:</strong>{' '}
              {t('portal_AED')} {loanInfo.totalFunds?.toLocaleString() || 0}
            </ListItem>
            <ListItem>
              <bdi>
                <strong>{t('portal_profile_nhls_numbers')}:</strong>{' '}
              </bdi>
              {loanInfo.nhlsNumbers || '-'}
            </ListItem>
          </List>
        </CardBody>
      </Card>
      {isModalOpen && (
        <AdditionalFundUpdateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fund={loanInfo.additionalFunds as number}
        />
      )}
    </>
  );
};
export default LoanDetails;
