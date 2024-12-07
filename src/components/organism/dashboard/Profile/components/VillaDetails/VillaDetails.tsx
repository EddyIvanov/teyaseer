import React, { useContext, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Hide,
  Show,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './VillaDetails.style';
import VillaPreviewModal from '../VillaPreviewModal/VillaPreviewModal';

import { Image, Loader } from '@/components';
import { T_ParseVillaDetails } from '@/components/organism/dashboard/Profile/Profile.type';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

const VillaDetails = (props: T_ParseVillaDetails) => {
  const {
    villaTitle,
    villaStyle,
    villaSize,
    imgSrc,
    detailsPath,
    bedrooms,
    bathrooms,
  } = props;

  const { userLoading } = useContext(DashboardContext);

  const router = useRouter();
  const { t } = useTranslation();
  const [isShowingPreview, setIsShowingPreview] = useState(false);

  const togglePreviewImageModal = () => {
    setIsShowingPreview(!isShowingPreview);
  };

  const navigateToVillaDetails = () => {
    if (detailsPath) router.push(detailsPath);
  };

  return (
    <>
      <Card __css={style.mainContainer}>
        {userLoading ? (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            sx={{ minHeight: '250px' }}
          >
            <Loader thickness="3px" size={'xl'} />
          </Flex>
        ) : (
          <>
            <Flex __css={style.leftContainer}>
              <CardHeader __css={style.header}>
                <Heading as="h2">{t('portal_villa_details')}:</Heading>
              </CardHeader>
              <CardBody>
                <Flex sx={style.villaDetails}>
                  {villaTitle && (
                    <Flex sx={style.villaDetail}>
                      <Text sx={style.villaDetailLabel}>
                        {t('portal_villa_title')}:
                      </Text>
                      <Text sx={style.villaDetailValue}>{villaTitle}</Text>
                    </Flex>
                  )}
                  <Flex sx={style.villaDetail}>
                    <Text sx={style.villaDetailLabel}>
                      {t('portal_villa_style')}:
                    </Text>
                    <Text sx={style.villaDetailValue}>{villaStyle}</Text>
                  </Flex>
                  {bedrooms && (
                    <Flex sx={style.villaDetail}>
                      <Text sx={style.villaDetailLabel}>
                        {t('portal_bedrooms')}:
                      </Text>
                      <Text sx={style.villaDetailValue}>{bedrooms}</Text>
                    </Flex>
                  )}
                  {bathrooms && (
                    <Flex sx={style.villaDetail}>
                      <Text sx={style.villaDetailLabel}>
                        {t('portal_bathrooms')}:
                      </Text>
                      <Text sx={style.villaDetailValue}>{bathrooms}</Text>
                    </Flex>
                  )}
                  <Flex sx={style.villaDetail}>
                    <Text sx={style.villaDetailLabel}>
                      {t('portal_villa_size')}:
                    </Text>
                    <Text sx={style.villaDetailValue}>{villaSize}</Text>
                  </Flex>
                  {/* keeping this commented code as the css is different here, so keeping it for future use */}
                  {/*
              <Flex sx={style.villaDetail}>
                <Text sx={style.villaDetailLabel}>Others:</Text>
                <Flex sx={style.villaDetailOthers}>
                  <Text sx={style.villaDetailValue}>No Elevator</Text>
                  <Text sx={style.villaDetailValue}>No Basement</Text>
                  <Text sx={style.villaDetailValue}>No Swimming Pool</Text>
                </Flex>
              </Flex> */}
                </Flex>
                <Hide above="md">
                  <Flex __css={style.imageContainer}>
                    <Image
                      lazyLoadTheme={'light'}
                      src={imgSrc || ''}
                      alt={'Villa Image'}
                      className="villaImage"
                      fill
                      onClick={togglePreviewImageModal}
                    />
                  </Flex>
                </Hide>
                <Flex sx={style.actionBtnContainer}>
                  <Button sx={style.actionBtn} onClick={navigateToVillaDetails}>
                    {t('portal_view')}
                  </Button>
                </Flex>

                <Text mt={6} fontSize={'xSmall'} as={'h6'}>
                  {t('portal_save_only_1_villa')}
                </Text>
              </CardBody>
            </Flex>
            <Show above="md">
              <Flex __css={style.rightContainer}>
                <Image
                  lazyLoadTheme={'light'}
                  src={imgSrc || ''}
                  alt={'Villa Image'}
                  className="villaImage"
                  fill
                  onClick={togglePreviewImageModal}
                />
              </Flex>
            </Show>
          </>
        )}
      </Card>
      <VillaPreviewModal
        imageUrl={imgSrc || ''}
        isShowingPreview={isShowingPreview}
        togglePreviewImageModal={togglePreviewImageModal}
      />
    </>
  );
};

export default VillaDetails;
