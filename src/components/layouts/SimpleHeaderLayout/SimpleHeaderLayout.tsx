import { ReactNode } from 'react';

import { Box, HStack, Button, Spacer, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './SimpleHeaderLayout.style';

import { Icon, Image, Link } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';
import AppRoutes from '@/constants/AppRoutes';
import { AssetType } from '@/types/ContentFul.type';

interface ISimpleHeaderLayout {
  children: ReactNode;
  logo?: AssetType;
  isFixedHeight?: boolean;
  backBtn?: {
    handleBack: () => void;
    label: string;
    iconName?: IconNames;
  };
}

const SimpleHeaderLayout = ({
  children,
  backBtn,
  isFixedHeight,
  logo,
}: ISimpleHeaderLayout) => {
  const router = useRouter();

  const logoRedirect = router.pathname.startsWith('/dashboard')
    ? AppRoutes.Dashboard.Home
    : AppRoutes.Home;

  return (
    <Box
      h={{ md: isFixedHeight ? '100dvh' : 'unset' }}
      overflow={isFixedHeight ? { base: 'hidden', md: 'hidden' } : 'auto'}
    >
      <HStack sx={style.header} alignItems={{ base: 'center', md: 'center' }}>
        {backBtn ? (
          <Button
            onClick={backBtn.handleBack}
            variant={'link'}
            leftIcon={
              <Icon
                name={backBtn.iconName || 'arrowLeft'}
                width={'18px'}
                height={'18px'}
              />
            }
          >
            {backBtn.label}
          </Button>
        ) : null}
        <Spacer />
        <Box>
          {logo ? (
            <Link sx={style.logo} href={logoRedirect}>
              <Image
                alt={logo?.fields?.title}
                src={logo?.fields?.file?.url}
                unoptimized
                lazyLoading={false}
                fill
              />
            </Link>
          ) : null}
        </Box>
        <Spacer />
        <Text
          sx={{
            visibility: 'hidden',
            display: { base: 'none', md: 'block' },
          }}
        >
          {backBtn?.label}
        </Text>
      </HStack>
      {children}
    </Box>
  );
};
export default SimpleHeaderLayout;
