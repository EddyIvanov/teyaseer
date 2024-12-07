import { useContext, useEffect, useState } from 'react';

import { Button, Flex, Text, Tooltip, useClipboard } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './VillaDetails.style';
import VillaDetailsProps from './VillaDetails.type';

import { Container, ContentfulRichText, Icon, Modal } from '@/components';
import { updateMe } from '@/components/organism/dashboard/Profile/Profile.api';
import { useGetPreselectedVilla } from '@/components/organism/dashboard/Profile/hooks/useGetPreselectedVilla';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

const VillaDetails = ({
  isMobile,
  villaDetails,
  isInsideCustomerPortal = false,
}: VillaDetailsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateUserContext } = useContext(DashboardContext);
  const { onCopy, setValue, hasCopied } = useClipboard('');
  const { villa, loading: villaDetailsLoading } = useGetPreselectedVilla();

  const [showVillaSavedModal, setShowVillaSavedModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(window.location.href);
  }, []);

  const handleCopyVillaLink = () => {
    onCopy();
  };

  const handleSelectingVilla = async () => {
    setLoading(true);
    try {
      const payload = {
        userInfo: {
          plotInfo: {
            preDesignedVillaId: villaDetails.fields.id,
          },
        },
      };
      await updateMe(payload);

      if (updateUserContext) {
        await updateUserContext();
      }

      setShowVillaSavedModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeSelectingVillaModal = () => {
    setShowVillaSavedModal(false);
  };

  const handleDone = () => {
    setShowVillaSavedModal(false);
    router.push(AppRoutes.Dashboard.Home);
  };

  const descriptionNode: any = villaDetails.fields.description;
  const consultant = villaDetails.fields.consultant;

  const firstSpecification = villaDetails.fields.specifications[0];
  const restSpecifications = villaDetails.fields.specifications.slice(1);
  const restSpecificationsHalfIndex = Math.floor(restSpecifications.length / 2);
  const firstColumnSpecifications = restSpecifications.slice(
    0,
    restSpecificationsHalfIndex + (restSpecifications.length % 2)
  );
  const secondColumnSpecifications = restSpecifications.slice(
    restSpecificationsHalfIndex + (restSpecifications.length % 2)
  );
  const isVillaExpandable = villaDetails.fields.specifications.some(
    spec => spec.fields.fieldName === 'expandedRooms'
  );
  const isSelectedByUser = villaDetails.fields.title === villa?.villaTitle;

  return (
    <>
      <Flex flexDirection="column">
        <Flex as={isMobile ? Container : Flex} flexDirection="column">
          <Flex sx={style.villaSpecsContainer}>
            <Flex sx={style.firstSpecification}>
              <Text>{firstSpecification.fields.title}</Text>
            </Flex>
            <Flex sx={style.restSpecifications}>
              <Flex __css={style.restSpecificationsInner}>
                {firstColumnSpecifications.map(specification => (
                  <Flex
                    key={specification.sys.id}
                    sx={{
                      ...style.villaSpec,
                      ...style.firstColVillaSpec,
                    }}
                  >
                    <Icon
                      name={specification.fields.iconName}
                      width={'24px'}
                      height={'24px'}
                    />
                    <Text>{specification.fields.title}</Text>
                  </Flex>
                ))}
              </Flex>
              <Flex __css={style.restSpecificationsInner}>
                {secondColumnSpecifications.map(specification => (
                  <Flex key={specification.sys.id} sx={style.villaSpec}>
                    <Icon
                      name={specification.fields.iconName}
                      width={'24px'}
                      height={'24px'}
                    />
                    <Text>{specification.fields.title}</Text>
                  </Flex>
                ))}
                {!isVillaExpandable ? (
                  <Flex sx={style.villaSpec}>
                    <Icon
                      name={'nonExpandable'}
                      width={'24px'}
                      height={'24px'}
                    />
                    <Text>{t('villa_not_expandable')}</Text>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
          <Flex sx={style.description}>
            <ContentfulRichText
              document={descriptionNode}
              className="villaDescription"
            >
              {consultant && (
                <Text>
                  <b>
                    {t('consultant')}: {consultant}
                  </b>
                </Text>
              )}
            </ContentfulRichText>
          </Flex>
          <Flex sx={style.villaActionContainer}>
            {!isInsideCustomerPortal ? (
              <Tooltip
                label={t('copied')}
                placement="top"
                hasArrow
                closeDelay={500}
                isOpen={hasCopied}
              >
                <Button
                  variant="secondary"
                  rightIcon={<Icon name="share" w="18px" h="18px" />}
                  onClick={() => handleCopyVillaLink()}
                >
                  {villaDetails.fields.shareVillaButtonText}
                </Button>
              </Tooltip>
            ) : null}
            {villaDetails.fields.floorPlanLink && (
              <Button
                sx={{
                  _rtl: {
                    svg: {
                      transform: 'rotate(0deg)',
                    },
                  },
                }}
                rightIcon={
                  <Icon
                    name={
                      villaDetails.fields.floorPlanLink.fields?.iconName ||
                      'download'
                    }
                    sx={{
                      path: {
                        stroke: 'white',
                      },
                    }}
                    w="18px"
                    h="18px"
                  />
                }
                as={'a'}
                href={villaDetails.fields.floorPlanPdf.fields?.file?.url}
                target="_blank"
              >
                {villaDetails.fields.floorPlanLink.fields?.label}
              </Button>
            )}
          </Flex>
          {isInsideCustomerPortal ? (
            <Flex sx={style.preDesignVillaActionContainer}>
              {/* {
                <Button
                  variant="secondary"
                  as={Link}
                  href="/dashboard/services/hire-consultant/your-vision"
                >
                  {t('portal_add_additional_requirements')}
                </Button>
              } */}
              <Button
                variant="primary"
                isLoading={loading || villaDetailsLoading}
                isDisabled={isSelectedByUser}
                rightIcon={
                  <Icon
                    name="arrowRight"
                    sx={{
                      path: {
                        stroke: 'white',
                      },
                    }}
                    w="18px"
                    h="18px"
                  />
                }
                onClick={handleSelectingVilla}
              >
                {t('portal_select_this_villa')}
              </Button>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      <Modal
        isOpen={showVillaSavedModal}
        onClose={closeSelectingVillaModal}
        showCloseButton={false}
        closeOnOverlayClick={false}
      >
        <Flex __css={style.savedVillaModalContainer}>
          <Flex>
            <Icon name="jaggedCheck" w="64px" h="64px" />
          </Flex>
          <Flex>
            <Text sx={style.savedVillaModalTitle}>
              {t('portal_villa_choice_saved')}
            </Text>
          </Flex>
          <Flex>
            <Text sx={style.savedVillaModalContent}>
              {t('portal_villa_choice_saved_body')}
            </Text>
          </Flex>
          <Flex>
            <Button variant="primary" onClick={handleDone}>
              {t('portal_done')}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default VillaDetails;
