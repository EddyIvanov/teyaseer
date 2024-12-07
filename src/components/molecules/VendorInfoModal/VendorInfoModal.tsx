import { useContext, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  Spacer,
  VStack,
} from '@chakra-ui/react';

import style from './VendorInfoModal.style';
import ExpandableText from '../ExpandableText/ExpandableText';

import { Icon, Image, Modal, Text } from '@/components';
import { getDocument } from '@/components/organism/dashboard/Documents/Documents.api';
import { IConsultantType } from '@/components/organism/dashboard/HireConsultants/Consultants.type';
import { Rating } from '@/components/organism/dashboard/HireConsultants/components/ConsultantsList/ConsultantItem/ConsultantItem';
import { companyName } from '@/helpers/companyNameTranslation';
import { formatDate } from '@/helpers/date';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

interface IVendorInformationModalProps {
  vendor?: IConsultantType;
  isOpen: boolean;
  onClose: () => void;
}
export const VendorInfoModal = ({
  vendor,
  isOpen,
  onClose,
}: IVendorInformationModalProps) => {
  const { locale } = useContext(Context);
  const { t } = useTranslation();
  const [showAllReview, setShowAllReview] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(!!vendor?.vendorLogoId);
  const [vendorLogoUrl, setVendorLogoUrl] = useState('');
  const sortedReview = vendor?.customerReviews?.sort((reviewA, reviewB) => {
    if (reviewA.createdDate > reviewB.createdDate) {
      return -1;
    } else {
      return 1;
    }
  });

  const reviewItemToDisplay = showAllReview
    ? sortedReview
    : sortedReview?.slice(0, 3);

  const fetchVendorLogoData = async (vendorLogoId: string) => {
    try {
      const response = await getDocument(vendorLogoId);
      const blob = response.data;
      const src = URL.createObjectURL(blob);
      setVendorLogoUrl(src);
    } finally {
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setVendorLogoUrl('');
      if (vendor?.vendorLogoId) {
        fetchVendorLogoData(vendor.vendorLogoId);
      }
    }
  }, [isOpen]);

  return vendor ? (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      showCloseButton={true}
      size={'6xl'}
      title={t('portal_vendor_details_modal_title')}
      contentStyle={{
        maxH: '95vh',
        overflow: 'auto',
      }}
    >
      <VStack sx={style.root}>
        <HStack gap="25px">
          <Flex
            w={'72px'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'65px'}
            bg={colors.imageBackgroundLight}
            borderRadius={'10px'}
            position="relative"
            overflow="hidden"
          >
            {!isImageLoading &&
              (vendorLogoUrl ? (
                <Image
                  src={vendorLogoUrl}
                  alt={vendor.companyName}
                  fill
                  lazyLoadTheme="light"
                />
              ) : (
                <Avatar
                  bg={colors.imageBackgroundLight}
                  color={colors.brand.primary}
                  size={'xl'}
                  name={companyName(vendor, locale)}
                />
              ))}
          </Flex>
          <VStack sx={style.headContainer}>
            <Text>{companyName(vendor, locale)}</Text>
            <Rating rate={vendor.ratings || '-'} />
          </VStack>
        </HStack>
        <Divider sx={style.divider} />
        <VStack w="100%" gap={'20px'} placeItems={'flex-start'}>
          <HStack sx={style.socialItemBox}>
            <Box sx={style.socialItemIconWrapper}>
              <Icon sx={style.socialItemIcon} name={'web'} />
            </Box>
            <VStack alignItems={'flex-start'}>
              <Text sx={style.socialItemTitle}>
                {t('portal_vendor_details_modal_website')}
              </Text>
              <Text sx={style.socialItemSubtitle}>
                {vendor.companyWebsite || '-'}
              </Text>
            </VStack>
          </HStack>

          <HStack sx={style.socialItemBox}>
            <Box sx={style.socialItemIconWrapper}>
              <Icon sx={style.socialItemIcon} name={'phone'} />
            </Box>
            <VStack alignItems={'flex-start'}>
              <Text sx={style.socialItemTitle}>
                {t('portal_vendor_details_modal_phone')}
              </Text>
              <Text sx={style.socialItemSubtitle}>
                {vendor.contactPhoneNumber || '-'}
              </Text>
            </VStack>
          </HStack>

          <HStack sx={style.socialItemBox}>
            <Box sx={style.socialItemIconWrapper}>
              <Icon sx={style.socialItemIcon} name={'mail'} />
            </Box>
            <VStack alignItems={'flex-start'}>
              <Text sx={style.socialItemTitle}>
                {t('portal_vendor_details_modal_email')}
              </Text>
              <Text sx={style.socialItemSubtitle}>
                {vendor.companyEmail || '-'}
              </Text>
            </VStack>
          </HStack>

          <Divider sx={style.divider} />

          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            rowGap={'30px'}
            columnGap={'50px'}
          >
            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_project_compeleted')}
              </Text>
              <Text sx={style.infoBoxSub}>
                {vendor?.completedProjectNumber || '-'}
              </Text>
            </VStack>

            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_project_outgoing')}
              </Text>
              <Text sx={style.infoBoxSub}>
                {vendor?.ongoingProjectNumber || '-'}
              </Text>
            </VStack>

            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_classification')}
              </Text>
              <Text sx={style.infoBoxSub}>{vendor.classification || '-'}</Text>
            </VStack>

            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_location')}
              </Text>
              <Text sx={style.infoBoxSub}>
                {locale === 'en'
                  ? vendor.preferredLocation
                  : vendor.preferredLocationAr}
              </Text>
            </VStack>

            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_registered_address')}
              </Text>
              <Text sx={style.infoBoxSub}>
                {vendor.registeredAddress || '-'}
              </Text>
            </VStack>

            <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_established')}
              </Text>
              <Text sx={style.infoBoxSub}>
                {vendor.establishmentDate || '-'}
              </Text>
            </VStack>
            {/* <VStack sx={style.infoBoxWrapper}>
              <Text sx={style.infoBoxTitle}>
                {t('portal_vendor_details_modal_number_staff')}
              </Text>
              <Text sx={style.infoBoxSub}>{vendor.numberOfStaff || '-'}</Text>
            </VStack> */}
          </Grid>
          {vendor.offeredServices && vendor.offeredServices?.length != 0 && (
            <>
              <Divider sx={style.divider} />
              <Text sx={style.textTitle}>
                {t('portal_vendor_details_modal_offered_services')}
              </Text>
              <VStack sx={style.servicesBox}>
                {Object.entries(vendor.offeredServices[0]).map(
                  ([key, value], index) => {
                    const extractArray = [
                      'id',
                      'overallRating',
                      'subContractorServicesUsage',
                    ];
                    if (value && !extractArray.includes(key)) {
                      return (
                        <Text key={index} sx={style.serviceItem}>
                          {t(`portal_vendor_service_${key}`)}
                        </Text>
                      );
                    }
                  }
                )}
              </VStack>
            </>
          )}
          <Divider sx={style.divider} />

          {/* customer's review list */}
          <Accordion defaultIndex={[0]} allowToggle width="100%">
            <AccordionItem border="none" width="100%">
              <AccordionButton
                minWidth="100%"
                justifyContent="space-between"
                pl={0}
                pr={0}
              >
                <Text sx={style.textTitle}>
                  {t('portal_vendor_details_modal_vendors_review_list')}
                </Text>
                <AccordionIcon sx={style.accordionIcon} />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="column"
                pt="20px"
                paddingInlineStart={0}
              >
                {reviewItemToDisplay?.map((customerReview, index) => (
                  <VStack sx={style.reviewBox} key={index}>
                    <HStack sx={style.reviewRow}>
                      <VStack sx={style.reviewTitleBox}>
                        <Text sx={style.reviewTitle}>
                          {t('portal_vendor_customer_review_title')}
                        </Text>
                        <Box sx={style.reviewSubtitle}>
                          {customerReview.responseText || (
                            <ExpandableText
                              text={
                                customerReview.responseText ??
                                t('not_available')
                              }
                              initialNumberOfLine={2}
                            />
                          )}
                        </Box>
                      </VStack>
                      <Spacer />
                      <VStack>
                        <Text sx={style.reviewDate}>
                          {formatDate(customerReview.createdDate)}
                        </Text>
                        <Rating
                          rate={
                            customerReview.responseRating
                              ? customerReview.responseRating.toFixed(1)
                              : '-'
                          }
                        />
                      </VStack>
                    </HStack>
                  </VStack>
                ))}
                {!showAllReview && vendor?.customerReviews?.length > 3 ? (
                  <Button
                    sx={style.viewMoreBtn}
                    variant={'secondary'}
                    onClick={() => setShowAllReview(true)}
                  >
                    <Text as="span">{t('load_more')}</Text>
                  </Button>
                ) : (
                  ''
                )}
                {!reviewItemToDisplay?.length && (
                  <Text align="center" color={colors.text.gray}>
                    {t('portal_no_reviews_yet')}
                  </Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </VStack>
    </Modal>
  ) : null;
};

export default VendorInfoModal;
