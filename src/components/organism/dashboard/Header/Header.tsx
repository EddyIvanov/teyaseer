import { Button, Flex, Hide, Show } from '@chakra-ui/react';

import style from './Header.styled';

import { Icon, Image, Link, Text } from '@/components';
import { HeaderDataType } from '@/components/layouts/SidebarLayout/SidebarLayout.type';
import useTranslation from '@/hooks/useTranslate';

interface SideBarHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  data?: HeaderDataType;
  logoPath?: string;
}

const DashboardHeader = ({
  isMenuOpen,
  setIsMenuOpen,
  data,
  logoPath = '/',
}: SideBarHeaderProps) => {
  const { t } = useTranslation();
  const handleToggleMenu = () => {
    setIsMenuOpen.toggle();
  };
  return (
    <Flex __css={style.root}>
      <Link sx={style.logo} href={logoPath}>
        {data?.logoBlack && (
          <Image
            width={data.logoBlack.fields.file.details.image.width}
            height={data.logoBlack.fields.file.details.image.height}
            src={data.logoBlack.fields.file.url}
            alt={data.logoBlack.fields.title}
            lazyLoading={false}
            unoptimized
          />
        )}
      </Link>

      <Hide below="lg">
        <Link sx={style.signOut} href={'/logout'}>
          <Icon name="signOut" w="25px" h="25px" />
          <Text as="span">{t('sign_out')}</Text>
        </Link>
      </Hide>
      <Show below="lg">
        <Button onClick={handleToggleMenu} variant={'unstyled'}>
          {isMenuOpen ? (
            <Icon name="close" width={'30px'} height={'22px'} fill="black" />
          ) : (
            <Icon name="menu" width={'30px'} height={'22px'} fill="black" />
          )}
        </Button>
      </Show>
    </Flex>
  );
};
export default DashboardHeader;
