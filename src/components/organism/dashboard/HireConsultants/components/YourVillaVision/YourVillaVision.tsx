import { ChangeEvent, useContext } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { IYourVillaVision } from './YourVillaVision.type';
import { ConsultantContext } from '../../Consultants.context';

import { Text, Textarea } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const YourVillaVision = (props: IYourVillaVision) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { yourVision, updateContextState } = useContext(ConsultantContext);
  const { onSubmit } = props;

  const handleSubmit = async () => {
    if (onSubmit) onSubmit();
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    updateContextState({
      yourVision: value,
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const style = useMultiStyleConfig('Card', {});
  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <Card>
          <CardHeader>
            <VStack gap={'20px'} alignItems={'flex-start'}>
              <Text sx={style.headerTitle}>
                {t('portal_hire_consultant_additional_title')}
              </Text>
              <Text sx={style.headerSubtitle}>
                {t('portal_hire_consultant_additional_subtitle')}
              </Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <Textarea
              onChange={handleChangeText}
              placeholder={t('portal_your_vision_placeholder')}
              sx={{
                maxW: '500px',
                w: '100%',
                textarea: {
                  minH: '150px !important',
                },
              }}
              defaultValue={yourVision}
            ></Textarea>
          </CardBody>
          <CardFooter>
            <Flex
              sx={{
                flex: 1,
                w: '100%',
                justifyContent: 'flex-start',
                gap: '20px',
              }}
            >
              <Button onClick={handleGoBack} variant={'secondary'}>
                {t('portal_go_back')}
              </Button>
              <Button onClick={handleSubmit}>
                {t('portal_confirm_button')}
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
};

export default YourVillaVision;
