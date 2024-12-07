import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './MobileMenu.style';
import { MobileMenuProps } from './MobileMenu.type';

import { Icon, Image, Text } from '@/components';
import { SignInUrls } from '@/constants/signInUrls.constants';
import { reloadHomePage } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import letterSpacings from '@/styles/themes/brand/letterSpacings';
import { LinkType } from '@/types/ContentFul.type';

const localeTranslator: any = {
  ar: 'en',
  en: 'ar',
};

const MobileMenu = ({
  isOpen,
  handleMenuToggle,
  data,
  handleChangeLanguage,
  handleLinkPress,
}: MobileMenuProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router as { locale: 'ar' | 'en' | undefined };

  const handleTeyaseerLogoClick = () => {
    handleMenuToggle();
    reloadHomePage(router);
  };

  return (
    <Box __css={style.root} data-open={isOpen}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        px={'32px'}
        className="mobile-header"
      >
        <Link
          aria-label={t('aria_label_logo_link')}
          onClick={handleTeyaseerLogoClick}
          href="/"
          className="logo"
        >
          <Image
            unoptimized
            src={data?.logoBlack.fields.file?.url || ''}
            alt={data?.logoBlack.fields.file.fileName || ''}
            width={data?.logoBlack.fields.file.details.image?.width}
            height={data?.logoBlack.fields.file.details.image?.height}
            lazyLoading={false}
          />
        </Link>
        <Button
          aria-label={t('aria_label_menu_button')}
          display={'flex'}
          onClick={handleMenuToggle}
          variant="unstyled"
        >
          <Icon name="close" width={'20px'} height={'20px'} />
        </Button>
      </Flex>

      <Flex px={'24px'} flex={1} flexDirection={'column'} overflowY={'auto'}>
        <Flex
          gap={'8px'}
          flexDirection={'column'}
          flex={1}
          justifyContent="flex-start"
          className="mobileMenuBody"
        >
          <Flex as={'ul'} flexDirection={'column'} className="primaryNav">
            {data?.primaryNav.map((item: any) => {
              return (
                <li key={item.fields.label}>
                  <Link
                    onClick={handleLinkPress}
                    href={item.fields.href}
                    target={item.fields.target}
                  >
                    {item.fields.label}
                  </Link>
                </li>
              );
            })}
          </Flex>
          <Flex as="ul" flexDirection={'column'} className="secondaryNav">
            {data?.secondaryNav.map((item: any) => {
              return (
                <li key={item.fields.label}>
                  <Link
                    href={item.fields.href}
                    target={item.fields.target}
                    onClick={handleLinkPress}
                  >
                    {item.fields.label}
                  </Link>
                </li>
              );
            })}
          </Flex>
          <Flex flexDir="column" mt="64px" gap="32px" mb={50}>
            <Box display="flex" flexDir="column">
              <Text
                color={colors.text.dark}
                fontWeight={FontWeights.semibold}
                fontSize={FontSizes.small}
                mb="16px"
                letterSpacing={letterSpacings}
              >
                {t('header_menu_group_title_customers')}
              </Text>

              <Button
                as={Link}
                onClick={handleMenuToggle}
                target="_self"
                href={SignInUrls.CUSTOMER_PORTAL_SIGN_IN}
                variant="uaePassBlack"
                leftIcon={<Icon name="fingerPrintWhite" />}
                sx={{ w: { base: '100%', sm: '345px' }, mb: '16px' }}
              >
                {t('continue_with_uae_pass')}
              </Button>
            </Box>
            <Box>
              <Text
                color={colors.text.dark}
                fontWeight={FontWeights.semibold}
                fontSize={FontSizes.small}
                mb="16px"
                letterSpacing={letterSpacings}
              >
                {t('header_menu_group_title_vendors')}
              </Text>
              <VStack gap={'15px'} placeItems={'flex-start'}>
                <Button
                  as="a"
                  target="_blank"
                  w="100%"
                  href={SignInUrls.VENDOR_LOGIN[locale || 'ar']}
                  variant={'secondary'}
                  sx={{ w: { base: '100%', sm: '345px' } }}
                >
                  {t('header_menu_group_item_login_to_vendor_portal')}
                </Button>
                <Button
                  as="a"
                  target="_blank"
                  href={SignInUrls.VENDOR_REGISTRATION[locale || 'ar']}
                  variant="primary"
                  sx={{ w: { base: '100%', sm: '345px' } }}
                >
                  {t('header_menu_group_item_continue_to_vendor_portal')}
                </Button>
              </VStack>
            </Box>
          </Flex>
          <Flex flex={1} />
          <Flex
            justifyContent={'space-between'}
            pb={{ base: '70px', md: '48px' }}
          >
            {/* Social Links start */}
            <Flex className="social_box">
              <Flex gap="24px">
                {data?.socialLinks?.fields.links.map(
                  (social: LinkType, index: number) => {
                    return (
                      <Link
                        aria-label={`${t('aria_label_social_links')} ${
                          social.fields.iconName
                        }`}
                        key={`socials-${index}`}
                        href={social?.fields?.href || '#'}
                        target={social.fields.target}
                      >
                        {social.fields.iconName && (
                          <Icon
                            name={social.fields.iconName}
                            width={'24px'}
                            height={'24px'}
                          />
                        )}
                      </Link>
                    );
                  }
                )}
              </Flex>
            </Flex>
            {/* Social Links end */}
            {/* Language Menu Start */}

            <Button
              variant={'unstyled'}
              data-id={locale === 'ar' ? 'en' : 'ar'}
              onClick={handleChangeLanguage}
              fontSize={FontSizes.medium}
              fontFamily={
                locale === 'en'
                  ? 'var(--primary-font)'
                  : 'var(--secondary-font)'
              }
            >
              {data?.languages[localeTranslator[locale || 'ar']]}
            </Button>

            {/* Language Menu End */}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default MobileMenu;
