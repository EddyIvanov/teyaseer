import { ChangeEvent, useContext, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Spinner,
  Stack,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { updateMe } from '../../Profile.api';
import { IMeUpdate } from '../../Profile.type';
import AdditionalContactFormModal from '../AdditionalContactFormModal/AdditionalContactFormModal';

import { Icon, Text } from '@/components';
import { UAE_COUNTRY_CODE } from '@/components/molecules/LeadCustomerForm/LeadCustomerForm.constants';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import borders from '@/styles/themes/brand/borders';
import boxShadows from '@/styles/themes/brand/boxShadows';
import colors from '@/styles/themes/brand/colors';
import { IUser, PREFERRED_AR, PREFERRED_EN } from '@/types/user.type';

interface IProfileDetails {
  userInfo: IUser;
}

const ProfileDetails = ({ userInfo }: IProfileDetails) => {
  const { t, translateByLocaleKey } = useTranslation();
  const toast = useToast();
  const router = useRouter();
  const { locale } = router;
  const { updateUserContext } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLanguageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const lang = e.target.checked ? 'ar' : 'en';
    try {
      setIsLoading(true);

      const payload: IMeUpdate = {
        userInfo: {
          preferredLanguage: lang === 'en' ? PREFERRED_EN : PREFERRED_AR,
        },
      };
      await updateMe(payload);
      await updateUserContext();
      await router.push(router.pathname, router.asPath, { locale: lang });
      toast({
        title: translateByLocaleKey(
          lang,
          'portal_profile_language_preference_update_success'
        ),
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(state => !state);
  };

  return (
    <>
      <Card
        overflow="hidden"
        p="6"
        gap="40px"
        border="0"
        borderRadius={borders.normal}
        boxShadow={boxShadows.panelBox}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        <CardHeader>
          <Heading
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize="2xl"
          >
            {t('portal_profile_details_title')}
            <Flex gap={'10px'} placeItems={'center'}>
              {!userInfo?.alternativeContactNumber && (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  fontSize="lg"
                  textTransform="none"
                  leftIcon={
                    <Icon
                      sx={{ path: { stroke: 'unset' } }}
                      name="plusCircle"
                    />
                  }
                  variant="link"
                >
                  {t('portal_profile_add_additional_info')}
                </Button>
              )}
              {isLoading && (
                <Spinner thickness="2px" size="lg" color={colors.primary} />
              )}
            </Flex>
          </Heading>
        </CardHeader>

        <CardBody>
          <Heading marginBottom="30px" fontSize="xxLarge" fontWeight="normal">
            {locale === 'ar' ? userInfo?.nameAr : userInfo.nameEn}
          </Heading>

          <Stack
            direction={{ base: 'column', sm: 'column', md: 'row' }}
            alignItems={{ base: 'normal', sm: 'normal', md: 'flex-end' }}
            gap={{ base: '40px' }}
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column" gap="10px">
              <Flex display="flex" alignItems="center" gap="10px">
                <Icon name="user" />
                <Text>{t('portal_profile_customer_id')}:</Text>
                {userInfo?.accountId}
              </Flex>
              <Flex display="flex" alignItems="center" gap="10px">
                <Icon name="email" />
                {userInfo?.email}
              </Flex>
              <Flex display="flex" alignItems="center" gap="10px">
                <Icon name="mobile" />
                <Text dir="ltr">{userInfo?.contactNumber}</Text>
              </Flex>
              {userInfo?.alternativeContactNumber && (
                <Flex display="flex" alignItems="center" gap="10px">
                  <Icon name="mobile" />
                  <Text dir="ltr">{userInfo?.alternativeContactNumber}</Text>
                  <Button
                    leftIcon={<Icon name="editBlack" />}
                    isDisabled={isLoading}
                    onClick={() => setIsModalOpen(true)}
                    variant="link"
                  >
                    {t('portal_edit')}
                  </Button>
                </Flex>
              )}
            </Box>

            <Box display="flex" flexDirection="column" gap="10px">
              <Text
                fontSize="xl"
                _ltr={{
                  mr: 10,
                }}
                _rtl={{
                  ml: 10,
                }}
              >
                {t('portal_profile_preferred_language')}
              </Text>
              <FormControl width="auto" display="flex" alignItems="center">
                <Flex gap="10px">
                  <FormLabel fontSize="2xl" m={0}>
                    ENG
                  </FormLabel>
                  <Switch
                    sx={{
                      '.chakra-switch__track': {
                        _checked: { bg: colors.primary },
                      },
                    }}
                    isDisabled={isLoading}
                    onChange={handleLanguageChange}
                    defaultChecked={
                      userInfo?.preferredLanguage === PREFERRED_EN
                        ? false
                        : true
                    }
                    size="lg"
                  />
                  <FormLabel fontSize="2xl" m={0}>
                    عربي
                  </FormLabel>
                </Flex>
              </FormControl>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      {isModalOpen && (
        <AdditionalContactFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          phoneNumber={userInfo.alternativeContactNumber?.replace(
            `+${UAE_COUNTRY_CODE}`,
            ''
          )}
        />
      )}
    </>
  );
};
export default ProfileDetails;
