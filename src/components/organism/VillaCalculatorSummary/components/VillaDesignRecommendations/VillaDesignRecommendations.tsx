import { useEffect, useState, useRef, useContext } from 'react';

import { Box, Button, SimpleGrid, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getVillaDesignRecommendations } from './VillaDesignRecommendations.api';
import style from './VillaDesignRecommendations.style';
import {
  VillaDesignRecommendationsProps,
  VillaDesignResponse,
} from './VillaDesignRecommendations.type';
import { SummarySlider } from '../SummarySlider/SummarySlider';

import { ConfirmModal, Loader, Text } from '@/components';
import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const VillaDesignRecommendations = ({
  villaType,
  villaBedrooms,
  villaSize,
  isDashboard = false,
}: VillaDesignRecommendationsProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [isUnsavedWarningModalOpen, setIsUnsavedWarningModalOpen] =
    useState(false);
  const router = useRouter();
  const [villaDesignRecs, setVillaDesignRecs] = useState<any>([]);
  const isShowingFeaturedVillas = useRef(false);
  const isShowingOnlySizeMatchedVillas = useRef(false);
  const sizeFilterObj = useRef<{
    sizeMin: string;
    sizeMax: string;
    isSizeFilterFound: boolean;
  }>({
    sizeMin: '',
    sizeMax: '',
    isSizeFilterFound: false,
  });

  const getRecommendedVillaDesigns = async () => {
    setLoading(true);
    const villaDesignsResponse: VillaDesignResponse =
      await getVillaDesignRecommendations(
        villaType,
        villaBedrooms,
        villaSize,
        locale
      );

    isShowingFeaturedVillas.current =
      villaDesignsResponse.isShowingFeaturedVillas;

    isShowingOnlySizeMatchedVillas.current =
      villaDesignsResponse.isShowingOnlySizeMatchedVillas;

    sizeFilterObj.current = villaDesignsResponse.sizeFilterObj;

    if (villaDesignsResponse.villas.length > 0) {
      const formattedVillaDesigns = villaDesignsResponse.villas?.map(
        (villaDesign: VillaType) => {
          return villaDesign.fields.images.map((image: any) => {
            const bedroomSpec = villaDesign.fields.specifications.find(
              spec => spec.fields.fieldName === 'bedrooms'
            );
            const expandedRoomsSpec = villaDesign.fields.specifications.find(
              spec => spec.fields.fieldName === 'expandedRooms'
            );

            return {
              title: villaDesign.fields.title,
              bedroomText: bedroomSpec?.fields.title,
              bedroomIconName: bedroomSpec?.fields.iconName,
              expandedRoomsText:
                expandedRoomsSpec?.fields.title || t('villa_not_expandable'),
              expandedRoomsIconName:
                expandedRoomsSpec?.fields.iconName || 'nonExpandable',
              bgSrc: image.fields.file.url,
            };
          });
        }
      );

      setVillaDesignRecs(formattedVillaDesigns);
    } else {
      setVillaDesignRecs([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getRecommendedVillaDesigns();
  }, []);

  const toVillaList = () => {
    let queryObj: any = {
      bedrooms: villaBedrooms,
    };

    if (sizeFilterObj.current.isSizeFilterFound) {
      queryObj.size = `${sizeFilterObj.current.sizeMin}${
        sizeFilterObj.current.sizeMax ? `-${sizeFilterObj.current.sizeMax}` : ''
      }`;
    }

    if (isShowingOnlySizeMatchedVillas.current) {
      delete queryObj.bedrooms;
    }

    if (isShowingFeaturedVillas.current) {
      queryObj = {};
    }

    if (isDashboard) {
      queryObj.villaType = villaType;
      return router.push({
        pathname: '/dashboard/services/select-villa',
        query: queryObj,
      });
    }
    setIsUnsavedWarningModalOpen(false);

    router.push({
      pathname: `/villas/${villaType}`,
      query: queryObj,
    });
  };

  const noVillasToRecommendWithChosenStyle =
    !isShowingFeaturedVillas.current &&
    villaDesignRecs?.length === 0 &&
    !loading;
  return (
    <>
      <SimpleGrid sx={style.vdrContainer}>
        <Box __css={style.vdrHeader}>
          <Stack sx={style.vdrHeaderContent}>
            <Box>
              <Text sx={style.vdrHeaderTitle}>
                {t('villa_recommendations')}
              </Text>

              {!noVillasToRecommendWithChosenStyle ? (
                <Text sx={style.vdrHeaderSubtitle}>
                  {t('villa_recommendations_body')}
                </Text>
              ) : (
                <Text sx={style.noVillasFoundText}>
                  {t('no_recommended_villa_design_found')}
                </Text>
              )}
            </Box>
            {!noVillasToRecommendWithChosenStyle ? (
              <Button
                onClick={() => setIsUnsavedWarningModalOpen(true)}
                variant="secondary"
                sx={style.vdrHeaderButton}
              >
                {t('see_more_villas')}
              </Button>
            ) : null}
          </Stack>
        </Box>
        {!loading ? (
          <>
            {!noVillasToRecommendWithChosenStyle &&
            villaDesignRecs?.length > 0 ? (
              <>
                <Box>
                  <SummarySlider data={villaDesignRecs[0]} delay={200} />
                </Box>
                {villaDesignRecs[1] ? (
                  <Box>
                    <SummarySlider data={villaDesignRecs[1]} delay={800} />
                  </Box>
                ) : null}
              </>
            ) : null}
          </>
        ) : (
          <Box __css={style.loaderContainer}>
            <Loader />
          </Box>
        )}
      </SimpleGrid>
      <ConfirmModal
        isOpen={isUnsavedWarningModalOpen}
        onCancel={() => setIsUnsavedWarningModalOpen(false)}
        onConfirm={() => toVillaList()}
        title={t('villa_calculator_unsaved_warning_modal_title')}
        description={t('villa_calculator_unsaved_warning_modal_description')}
        confirmText={t('portal_continue')}
        cancelText={t('portal_cancel')}
      />
    </>
  );
};

export default VillaDesignRecommendations;
