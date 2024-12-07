import React from 'react';

import { Flex } from '@chakra-ui/react';

import villaShortDetailsStyle from './VillaShortDetails.style';
import { VillaShortDetailsProps } from './VillaShortDetails.type';

import { ContentfulRichText, Icon, Link, Text } from '@/components';
import { villaUrls } from '@/constants/villaUrls.constant';
import { isExternalUrl } from '@/helpers/isExternalUrl';
import useTranslation from '@/hooks/useTranslate';

const VillaShortDetails = (villaShortDetails: VillaShortDetailsProps) => {
  const { t } = useTranslation();
  const style = villaShortDetailsStyle({
    isMirrored: villaShortDetails.isMirrored,
  });
  const filteredSpecs = villaShortDetails.specifications?.filter(
    specification => specification.fields.showInList
  );
  const expandedRoomsSpecIndex = filteredSpecs?.findIndex(
    spec => spec.fields.fieldName === 'expandedRooms'
  );

  let expandedRoomsSpec = null;
  if (expandedRoomsSpecIndex > -1) {
    expandedRoomsSpec = filteredSpecs[expandedRoomsSpecIndex];
    filteredSpecs.splice(expandedRoomsSpecIndex, 1);
  }

  const getPDFURL = (pdfLink: string) => {
    if (isExternalUrl(pdfLink)) {
      return pdfLink;
    } else {
      return `https:${villaShortDetails.floorPlanPdf.fields.file.url}`;
    }
  };

  const villaDetailsHref = villaShortDetails.isInsideCustomerPortal
    ? `${villaUrls.SERVICES_PRE_DESIGN_VILLAS}${villaShortDetails.id}`
    : `${villaShortDetails.learnMore.fields.href}${villaShortDetails.id}`;

  return (
    <Flex __css={style.root}>
      <Text as="h1" className="villaTitle">
        {villaShortDetails.title}
        <Link className="learnMoreLink" href={villaDetailsHref}>
          {villaShortDetails.learnMore.fields.label}{' '}
          <Icon name={'arrowRight'} width="18px" height="18px" />
        </Link>
      </Text>

      <Flex className="villaSpecs">
        <Flex className="villaSpecsInner">
          {villaShortDetails.specifications &&
            filteredSpecs.map(specification => (
              <Flex key={specification.fields.title} className="villaSpec">
                <Flex>
                  <Icon
                    name={specification.fields.iconName || 'clock'}
                    width={'24px'}
                    height={'24px'}
                  />
                </Flex>
                <Text>{specification.fields.title}</Text>
              </Flex>
            ))}
          {expandedRoomsSpec ? (
            <Flex className="villaSpec">
              <Flex>
                <Icon
                  name={expandedRoomsSpec.fields.iconName || 'clock'}
                  width={'24px'}
                  height={'24px'}
                />
              </Flex>
              <Text>{expandedRoomsSpec.fields.title}</Text>
            </Flex>
          ) : (
            <Flex className="villaSpec">
              <Flex>
                <Icon name={'nonExpandable'} width={'24px'} height={'24px'} />
              </Flex>
              <Text>{t('villa_not_expandable')}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <ContentfulRichText
        className="villaDescription"
        document={villaShortDetails.description}
      />
      {villaShortDetails.floorPlanLink && villaShortDetails.floorPlanPdf && (
        <Link
          target={villaShortDetails.floorPlanLink.fields.target}
          href={getPDFURL(villaShortDetails.floorPlanPdf.fields?.file?.url)}
          sx={style.floorPlanLink}
        >
          {villaShortDetails.floorPlanLink.fields.label}
          <Flex className="downloadIcon">
            <Icon
              name={
                villaShortDetails.floorPlanLink.fields?.iconName || 'download'
              }
              w="18px"
              h="18px"
            />
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

export default VillaShortDetails;
