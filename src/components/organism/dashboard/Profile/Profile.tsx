import { useContext } from 'react';

import { Flex, Hide, Show } from '@chakra-ui/react';

import PlotDetails from './components/PlotDetails/PlotDetails';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import ProfileSidebar from './components/ProfileSidebar';
import VendorCard from './components/VendorCard/VendorCard';
import VillaDetails from './components/VillaDetails/VillaDetails';
import useGetVendors from './hooks/useGetVendors';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

import { useGetPreselectedVilla } from '@/components/organism/dashboard/Profile/hooks/useGetPreselectedVilla';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

const Profile = () => {
  const { t } = useTranslation();
  const { user, userLoading } = useContext(DashboardContext);
  const { villa } = useGetPreselectedVilla();
  const { vendors, loading: isVendorsLoading } = useGetVendors();

  if (!user || userLoading || isVendorsLoading) {
    return <CenteredLoader variant="myProfileSkeleton" />;
  }

  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <ProfileDetails userInfo={user.userInfo} />
        <Hide above="xl">
          <Flex flexDirection="column" gap="24px">
            <ProfileSidebar {...user} />
          </Flex>
        </Hide>
        <PlotDetails plotInfo={user.userInfo.plotInfo} />
        {vendors?.awardedConsultant && (
          <VendorCard
            title={t('portal_your_design_consultant')}
            data={vendors?.awardedConsultant}
          />
        )}
        {vendors?.awardedContractor && (
          <VendorCard
            title={t('portal_your_contractor')}
            data={vendors.awardedContractor}
          />
        )}

        {villa ? <VillaDetails {...villa} /> : null}
      </Flex>
      <Show above="xl">
        <Flex flexDirection="column" gap="24px">
          <ProfileSidebar {...user} />
        </Flex>
      </Show>
    </Flex>
  );
};

export default Profile;
