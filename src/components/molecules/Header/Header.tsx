import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './Header.style';
import { HeaderProps } from './header.type';
import Menu from '../Menu/Menu';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = ({
  updateHeaderStyleOnScroll,
  alwaysOpaqueStyle,
  headerData: data,
}: HeaderProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const isScrolled = alwaysOpaqueStyle
    ? alwaysOpaqueStyle
    : updateHeaderStyleOnScroll && isPageScrolled;

  const customStyle = style({
    isScrolled,
  });

  const handleScroll = () => {
    const isScrolled = window.scrollY > 5;
    setIsPageScrolled(isScrolled);
  };

  const handleMenuToggle = useCallback(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
      onClose();
    } else {
      document.body.style.overflow = 'hidden';
      onOpen();
    }
  }, [isOpen]);

  const handleChangeLanguage = async (e: BaseSyntheticEvent) => {
    isOpen && handleMenuToggle();
    const lang = e.currentTarget.getAttribute('data-id');
    await router.push(router.pathname, router.asPath, {
      locale: lang,
    });
  };

  const handleLinkPress = () => {
    isOpen && handleMenuToggle();
  };

  useEffect(() => {
    if (updateHeaderStyleOnScroll && !alwaysOpaqueStyle) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (updateHeaderStyleOnScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [updateHeaderStyleOnScroll]);

  return (
    <Flex as="header" __css={customStyle.root}>
      <Menu
        isScrolled={isScrolled}
        data={data}
        handleMenuToggle={handleMenuToggle}
        handleChangeLanguage={handleChangeLanguage}
        handleLinkPress={handleLinkPress}
      />
      <MobileMenu
        isOpen={isOpen}
        data={data}
        handleMenuToggle={handleMenuToggle}
        handleChangeLanguage={handleChangeLanguage}
        handleLinkPress={handleLinkPress}
      />
    </Flex>
  );
};
export default Header;
