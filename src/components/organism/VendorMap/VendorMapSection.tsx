import React, { useRef, useState } from 'react';

import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './VendorMapSection.style';
import { VendorMapSectionProps } from './VendorMapSextion.type';

import { Container, ContentfulRichText, Section } from '@/components';
import Map, { MapDefaults } from '@/components/molecules/Map';
import { LocationDetails } from '@/components/molecules/Map/components/LocationDetails/LocationDetails';
import { DEFAULT_MAP_OPTIONS } from '@/components/molecules/Map/constants/Map.constants';
import { useFetchVendorMapData } from '@/helpers/vendorMapHelpers/useFetchVendorMapData';
import useInViewport from '@/hooks/useInVewport';
import useTranslation from '@/hooks/useTranslate';
import { LocalizationTypes } from '@/types/localization.type';

const localeMap: { [key: string]: 'nameEnglish' | 'nameArabic' } = {
  en: 'nameEnglish',
  ar: 'nameArabic',
};

const VendorMapSection = ({ mainTitle, id }: VendorMapSectionProps) => {
  const locale = (useRouter().locale as LocalizationTypes) || 'ar';
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [showDistricts, setShowDistricts] = useState(false);
  const [hasZoomed, setHasZoomed] = useState(false);

  const {
    municipalityCenter,
    districtsCluster,
    isMunicipalitiesLoading,
    isDistrictsLoading,
  } = useFetchVendorMapData();

  const handleLoading = () => {
    if (!isDistrictsLoading && !isDistrictsLoading) return false;
    if (showDistricts && isDistrictsLoading) {
      return true;
    }
    if (isMunicipalitiesLoading) return true;
  };

  const handleZoomCB = (zoom: number) => {
    if (!hasZoomed) setHasZoomed(true);
    if (zoom <= MapDefaults.ZOOM_DESKTOP) {
      setShowDistricts(false);
    } else {
      setShowDistricts(true);
    }
  };

  return (
    <Section
      ref={sectionRef}
      __css={style.root}
      id={id}
      height={isInview ? '100dvh' : '100svh'}
    >
      <Map
        isLoading={handleLoading()}
        {...(!hasZoomed &&
          municipalityCenter && { center: municipalityCenter })}
        zoom={isMobile ? MapDefaults.ZOOM_MIN : MapDefaults.ZOOM_DESKTOP}
        options={{
          ...DEFAULT_MAP_OPTIONS,
          minZoom: MapDefaults.ZOOM_MIN,
          maxZoom: MapDefaults.ZOOM_MAX,
        }}
        onZoomCB={handleZoomCB}
        polygons={
          showDistricts
            ? districtsCluster?.district
            : districtsCluster?.municipality
        }
        renderPolygonInfoDetails={data => {
          return (
            <LocationDetails
              title={data[localeMap[locale]]}
              details={[
                {
                  title: t('total_projects'),
                  value:
                    data.countCompletedProjects + data.countOngoingProjects,
                },
              ]}
            />
          );
        }}
      />
      <Container
        sx={{
          ...style.container,
          'section:has(.infoBox) &': {
            display: { base: 'none' },
          },
        }}
      >
        <Flex className="mapTitle">
          <ContentfulRichText document={mainTitle} className="title" />
        </Flex>
      </Container>
    </Section>
  );
};

export default VendorMapSection;
