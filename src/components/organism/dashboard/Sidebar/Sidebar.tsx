import React, { Fragment, useContext, useMemo, useState } from 'react';

import { Box, Flex, Hide, Show } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './Sidebar.styled';
import Steps from './Steps';

import { Icon, Link, Text } from '@/components';
import { HeaderDataType } from '@/components/layouts/SidebarLayout/SidebarLayout.type';
import { fetchUrlFromWindowPathName } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';
import { LinkType } from '@/types/ContentFul.type';

interface sideBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  data?: HeaderDataType;
}

const DashboardSidebar = ({
  isMenuOpen,
  setIsMenuOpen,
  data,
}: sideBarProps) => {
  const { t } = useTranslation();
  const { serviceStages } = useContext(DashboardContext);
  const { locale } = useContext(Context);
  const [currentSelected, setCurrentSelected] = useState(0);
  const router = useRouter();
  const handleToggleMenu = () => {
    setCurrentSelected(-1);
    setIsMenuOpen.toggle();
  };

  const handleLinkOpen = () => {
    handleToggleMenu();
  };

  const currentUrl = useMemo(
    () => fetchUrlFromWindowPathName(router?.pathname, locale),
    [router.pathname, locale]
  );

  return (
    <>
      <Show below="lg">
        <Box
          onClick={handleToggleMenu}
          data-open={isMenuOpen}
          __css={style.backdrop}
        />
      </Show>
      <Flex data-open={isMenuOpen} __css={style.root} className="scrollbar">
        <Flex as={'ul'}>
          {data?.primaryNav.map((item: LinkType, index: number) => {
            const url = item.fields?.href;
            const isActive = url === currentUrl;
            const isYourJourney = item?.fields?.iconName === 'arrowForward'; // temporary so that it works for QA and UAT

            return (
              <Fragment key={index}>
                {isYourJourney ? (
                  <Steps
                    handleToggleMenu={handleToggleMenu}
                    steps={serviceStages}
                    currentSelected={currentSelected}
                    setCurrentSelected={setCurrentSelected}
                    title={item.fields.label}
                  />
                ) : (
                  <Flex data-active={isActive} as={'li'}>
                    <Link onClick={handleLinkOpen} href={url}>
                      {item.fields.iconName && (
                        <Icon
                          width={'24px'}
                          height={'24px'}
                          className="icon"
                          name={item.fields.iconName}
                        />
                      )}
                      <Text as={'span'}>{item.fields.label}</Text>
                    </Link>
                  </Flex>
                )}
              </Fragment>
            );
          })}
          {data && (
            <Hide above="lg">
              <Link
                sx={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center',
                  py: '15px',
                }}
                href={'/logout'}
              >
                <Icon color={colors.primary} name="signOut" w="24px" h="24px" />
                <Text as="span">{t('sign_out')}</Text>
              </Link>
            </Hide>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardSidebar;
