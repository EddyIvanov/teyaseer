import React, { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { MainArticle, Modal } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';
import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import { ServiceDescriptionArticle } from '@/components/organism/dashboard/Stages/Stage.type';
import useTranslation from '@/hooks/useTranslate';
import { AssetType } from '@/types/ContentFul.type';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  logo?: AssetType;
  iconName?: IconNames;
  data: ServiceDescriptionArticle;
  children: ReactNode;
};

export const SRModal = ({
  isOpen,
  onClose,
  loading,
  logo,
  data,
  children,
}: TProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        '.chakra-modal__body': {
          p: 0 + '!important',
        },
      }}
    >
      <SimpleHeaderLayout
        logo={logo}
        backBtn={{
          handleBack: onClose,
          label: t('portal_back_to_all_services'),
        }}
      >
        <Box sx={{ width: '100vw', height: '100vh' }}>
          {data && (
            <MainArticle
              isLoading={loading}
              backgroundImg={data.backgroundImage}
              title={data.mainTitle}
              description={data.description}
              displayLinkAs={data.displayLinkAs}
              variant={data.swapImagePosition ? 'swapImage' : 'normalImage'}
              size={'fullScreen'}
              id={data.id}
            >
              {children}
            </MainArticle>
          )}
        </Box>
      </SimpleHeaderLayout>
    </Modal>
  );
};
