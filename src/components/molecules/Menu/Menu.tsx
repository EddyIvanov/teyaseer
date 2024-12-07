import {
  Box,
  Button,
  Menu as ChakraMenu,
  Flex,
  MenuButton,
  MenuDivider,
  MenuList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './Menu.style';
import { MenuProps } from './Menu.type';

import { Container, Icon, Text } from '@/components';
import Logo from '@/components/atoms/Logo/Logo';
import { SignInUrls } from '@/constants/signInUrls.constants';
import { reloadHomePage } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import letterSpacings from '@/styles/themes/brand/letterSpacings';

const localeTranslator = {
  ar: 'en',
  en: 'ar',
};

const Menu = ({
  isScrolled,
  data,
  handleChangeLanguage,
  handleLinkPress,
  handleMenuToggle,
}: MenuProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router as { locale: 'ar' | 'en' | undefined };
  const {
    isOpen: isMenuOpen,
    onToggle: onMenuToggle,
    onClose: onMenuClose,
  } = useDisclosure();

  const customStyle = style({
    isScrolled,
  });

  return (
    <Container sx={customStyle.root}>
      <Flex alignItems={'center'} h="100%">
        <Link
          aria-label={t('aria_label_logo_link')}
          href="/"
          className="logo-link"
          onClick={() => reloadHomePage(router)}
        >
          <Logo />
        </Link>
        <Flex as="nav">
          {data?.primaryNav.map((item: any) => {
            return (
              <Link
                key={item.fields.label}
                href={item.fields.href}
                target={item.fields.target}
              >
                {item.fields.label}
              </Link>
            );
          })}
        </Flex>
      </Flex>
      <Flex h="100%">
        <Flex as="nav">
          {data?.secondaryNav.map((item: any) => {
            return (
              <Link
                key={item.fields.label}
                href={item.fields.href}
                target={item.fields.target}
                onClick={handleLinkPress}
              >
                {item.fields.label}
              </Link>
            );
          })}
        </Flex>

        {/* Language Menu Start */}
        <Button
          className="language_btn"
          variant={'unstyled'}
          data-id={locale === 'ar' ? 'en' : 'ar'}
          onClick={handleChangeLanguage}
          fontFamily={
            locale === 'en' ? 'var(--primary-font)' : 'var(--secondary-font)'
          }
        >
          {data?.languages[localeTranslator[locale || 'ar']]}
        </Button>
        <Box className="divider" />
        <Flex className="get_started">
          <ChakraMenu
            isOpen={isMenuOpen}
            placement={locale === 'en' ? 'top-end' : 'top-start'}
            offset={locale === 'en' ? [120, 22] : [-160, 22]}
          >
            <MenuButton
              as={Button}
              variant={'tertiary'}
              textTransform={'uppercase'}
              onClick={onMenuToggle}
            >
              {t('get_started')}
            </MenuButton>
            {isMenuOpen && (
              <Box
                className="overlay"
                __css={customStyle.signUpOverlay}
                onClick={onMenuClose}
              />
            )}
            <MenuList __css={customStyle.desktopMenuList}>
              <Flex __css={customStyle.customerDesktopMenuList}>
                <Text
                  color={colors.text.dark}
                  fontWeight={FontWeights.semibold}
                  fontSize={FontSizes.small}
                  letterSpacing={letterSpacings}
                >
                  {t('header_menu_group_title_customers')}
                </Text>
                <Button
                  as={Link}
                  onClick={onMenuClose}
                  target="_self"
                  href={SignInUrls.CUSTOMER_PORTAL_SIGN_IN}
                  variant="uaePassBlack"
                  leftIcon={<Icon name="fingerPrintWhite" />}
                >
                  {t('continue_with_uae_pass')}
                </Button>
              </Flex>
              <MenuDivider />
              <Box padding="24px 30px 32px">
                <Text
                  color={colors.text.dark}
                  fontWeight={FontWeights.semibold}
                  fontSize={FontSizes.small}
                  mb="24px"
                  letterSpacing={letterSpacings}
                >
                  {t('header_menu_group_title_vendors')}
                </Text>
                <VStack gap={'15px'}>
                  <Button
                    as="a"
                    target="_blank"
                    w="100%"
                    href={SignInUrls.VENDOR_LOGIN[locale || 'ar']}
                    variant={'secondary'}
                  >
                    {t('header_menu_group_item_login_to_vendor_portal')}
                  </Button>
                  <Button
                    as="a"
                    target="_blank"
                    w="100%"
                    href={SignInUrls.VENDOR_REGISTRATION[locale || 'ar']}
                    variant={'primary'}
                  >
                    {t('header_menu_group_item_continue_to_vendor_portal')}
                  </Button>
                </VStack>
              </Box>
            </MenuList>
          </ChakraMenu>
        </Flex>
      </Flex>
      <Box onClick={handleMenuToggle} className="mobileMenuBtn">
        <Button aria-label={t('aria_label_menu_button')} variant="unstyled">
          <Icon
            name="menu"
            width={'24px'}
            height={'10px'}
            fill={isScrolled ? colors.text.dark : colors.secondary}
          />
        </Button>
      </Box>
    </Container>
  );
};
export default Menu;
