import { useEffect, useState } from 'react';

import {
  Button,
  Container,
  Flex,
  useBoolean,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getHeaderData } from './SidebarLayout.api';
import style from './SidebarLayout.style';
import { HeaderDataType, IDashboardLayout } from './SidebarLayout.type';
import Header from '../../organism/dashboard/Header';
import Sidebar from '../../organism/dashboard/Sidebar';

import { Icon, JourneyProgress, Link, Text } from '@/components';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';

const SidebarLayout = ({
  children,
  hasBackToServices = false,
  backToServicesButton,
}: IDashboardLayout) => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useBoolean();
  const [data, setData] = useState<HeaderDataType>();
  const router = useRouter();
  const isBelowScreenWidthXl = useBreakpointValue(
    {
      base: true,
      lg: false,
    },
    { fallback: 'lg' }
  );
  const { locale = '' } = router;

  const logoPath = AppRoutes.Dashboard.Home;

  const isDashboardPage = router.pathname.startsWith('/dashboard');

  useEffect(() => {
    // disable page scroll when menu is open and screen is below xl
    if (isMenuOpen && isBelowScreenWidthXl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    getHeaderData(locale).then((res: any) => {
      if (res) setData(res);
    });
  }, [locale]);

  return (
    <Flex __css={style.root}>
      <Header
        data={data}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        {...(isDashboardPage && { logoPath })}
      />
      <Flex __css={style.contentWrapper}>
        <Sidebar
          data={data}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Flex __css={style.mainBox} as={'main'}>
          <Container sx={{ maxWidth: '100%' }}>
            <JourneyProgress />
          </Container>
          {hasBackToServices && (
            <Button
              as={Link}
              href="/dashboard/services"
              variant={'unstyled'}
              sx={style.backToService}
            >
              <Icon name="arrowBack" />
              <Text>{t('portal_back_to_services')}</Text>
            </Button>
          )}
          {backToServicesButton && backToServicesButton}
          <Container sx={style.container}>
            <Flex flex={1} height="100%">
              {children}
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SidebarLayout;
