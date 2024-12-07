import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react';

import { Icon, Text } from '@/components';
import { PlotMap } from '@/components/molecules/PlotMap/PlotMap';
import PlotModal from '@/components/organism/dashboard/Profile/components/PlotModal';
import { extractPlotNumber } from '@/helpers/extractPlotNumber';
import { printVillaSize } from '@/helpers/printVilaSize';
import useTranslation from '@/hooks/useTranslate';
import borders from '@/styles/themes/brand/borders';
import boxShadows from '@/styles/themes/brand/boxShadows';
import { IPlotInfo } from '@/types/user.type';

interface IPlotDetails {
  plotInfo: IPlotInfo;
}

const PlotDetails = ({ plotInfo }: IPlotDetails) => {
  const { t } = useTranslation();

  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false);
  const [communityNumber, plotNumber] = extractPlotNumber(plotInfo?.number);

  const onClose = () => {
    setIsPlotModalOpen(false);
  };

  return (
    <>
      {isPlotModalOpen && <PlotModal onClose={onClose} />}
      <Card
        border="0"
        borderRadius={borders.normal}
        overflow="hidden"
        boxShadow={boxShadows.panelBox}
        direction="row"
        gap="6"
        justifyContent={'space-between'}
      >
        <Flex
          width="full"
          direction={{ base: 'column', sm: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack p="6">
            <CardBody fontSize="small">
              <Heading marginBottom="30px" fontSize="2xl">
                {t('portal_profile_plot_details')}
              </Heading>
              <List spacing={8}>
                <ListItem>
                  <strong>{t('portal_plot_community_number')}:</strong>{' '}
                  {communityNumber || '-'}
                </ListItem>
                <ListItem>
                  <strong>{t('portal_profile_plot_number')}:</strong>{' '}
                  {plotNumber || '-'}
                </ListItem>
                <ListItem>
                  <strong>{t('portal_profile_plot_size')}:</strong>{' '}
                  {printVillaSize(plotInfo?.size)}
                </ListItem>
                <ListItem>
                  <strong>{t('portal_profile_plot_location')}:</strong> <br />
                  {plotInfo?.plotLocation || ''} -{' '}
                  {plotInfo?.districtZone || ''}
                </ListItem>
                <ListItem>
                  <Button
                    textTransform={'inherit'}
                    variant={'link'}
                    rightIcon={<Icon name="arrowLink" />}
                    onClick={() => setIsPlotModalOpen(true)}
                  >
                    <Text fontWeight={'semibold'} fontSize={'small'}>
                      {t('update_your_location')}
                    </Text>
                  </Button>
                </ListItem>
              </List>
            </CardBody>
          </Stack>
          <Box
            width={{ base: '100%', sm: '100%', md: '53%' }}
            height="300px"
            display="flex"
            alignItems="center"
            overflow="hidden"
          >
            <PlotMap />
          </Box>
        </Flex>
      </Card>
    </>
  );
};
export default PlotDetails;
