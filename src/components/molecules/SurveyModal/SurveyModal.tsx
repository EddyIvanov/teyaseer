import { Button, Flex, chakra } from '@chakra-ui/react';

import { ISurveyModalProps } from './SurveyModal.type';

import { Modal } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { skipCurrentSurvey } from '@/services/users';
import sizes from '@/styles/themes/brand/sizes';

const Iframe = chakra('iframe');
const SurveyModal = ({ url, isOpen, onClose }: ISurveyModalProps) => {
  const { t } = useTranslation();
  const handleCancelSurvey = () => {
    onClose();
    skipCurrentSurvey();
  };
  const handleRemindMeLater = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} size={'6xl'} onClose={handleCancelSurvey}>
      <Iframe
        sx={{
          height: {
            base: `calc(100vh - ${sizes.modalHeaderSize} - ${'80px'})`,
          },
          maxHeight: { md: 'clamp(300px, calc(100vh - 260px), 1100px)' },
        }}
        src={url}
        width={'100%'}
        height={'100%'}
      />
      <Flex
        sx={{
          mt: '2rem',
          justifyContent: 'flex-end',
          gap: 3,
        }}
      >
        <Button onClick={handleCancelSurvey} variant={'secondary'}>
          {t('portal_survey_modal_cancel')}
        </Button>
        <Button onClick={handleRemindMeLater} variant={'tertiary'}>
          {t('portal_survey_modal_remind_later')}
        </Button>
      </Flex>
    </Modal>
  );
};

export default SurveyModal;
