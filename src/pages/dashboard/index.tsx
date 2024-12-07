import { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import { Box, Divider, Flex } from '@chakra-ui/react';

import { OnHoldNotifications, Text } from '@/components';
import { SidebarLayout } from '@/components/layouts';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import DashboardActivatedService from '@/components/organism/dashboard/DashboardActivatedService/DashboardActivatedService';
import DashboardHomeSection from '@/components/organism/dashboard/DashboardHomeSection/DashboardHomeSection';
import ServiceInfo from '@/components/organism/dashboard/ServiceInfo';
import { StageData } from '@/components/organism/dashboard/Stages/Stage.type';
import Onboarding from '@/components/organism/dashboard/onboarding';
import { StatusProject } from '@/helpers/statusProject';
import useTranslation from '@/hooks/useTranslate';
import DashboardProvider, {
  DashboardContext,
} from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { getActivatedServices } from '@/services/users';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activatedServices, setActivatedServices] = useState<StageData[]>([]);

  const { serviceStages, user } = useContext(DashboardContext);
  const projectInfo = user?.userInfo?.projectInfo;

  const { locale } = useContext(Context);
  const { t } = useTranslation();

  const userName = useMemo(
    () => (locale === 'ar' ? user?.userInfo.nameAr : user?.userInfo.nameEn),
    [user, locale]
  );

  const getActivatedServicesList = async (controller: AbortController) => {
    try {
      const response = await getActivatedServices(locale, controller);
      setActivatedServices(response.data.data);
    } catch {
      setActivatedServices([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    getActivatedServicesList(controller);

    return () => {
      controller.abort();
    };
  }, []);

  if (!userName || isLoading) {
    return <CenteredLoader variant="dashbaordHomeSkeleton" />;
  }

  return (
    <Box width="100%" maxW={'941px'}>
      <Box pb="95px">
        {!!userName && (
          <Text fontSize={'2.4rem'} mb={'20px'}>
            {t('portal_welcome_back').replace('{{userName}}', userName)}
          </Text>
        )}

        {StatusProject.isOnHold(projectInfo?.projectStatus) && (
          <OnHoldNotifications />
        )}

        {user?.isOnboardingComplete !== true ? (
          <Onboarding />
        ) : activatedServices.length ? (
          <Flex gap={'24px'} flexDirection={'column'}>
            {activatedServices.map(
              activatedService =>
                activatedService.optionsCollection?.items?.map(
                  (option, index) => (
                    <DashboardActivatedService
                      key={`${option.title}-${index}`}
                      activatedServiceData={activatedService}
                      currentOptionsIndex={index}
                    />
                  )
                )
            )}
          </Flex>
        ) : (
          <DashboardHomeSection />
        )}

        <Divider
          orientation="horizontal"
          height={'45px'}
          opacity={'1'}
          position="absolute"
          borderColor={'rgba(208, 208, 208, 0.5)'}
          left={0}
          width={'100%'}
        />
      </Box>
      {user && serviceStages && (
        <ServiceInfo
          infoData={serviceStages}
          defaultCollapsed={user?.userInfo?.projectInfo?.stage === 'Onboarding'}
        />
      )}
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>{page}</SidebarLayout>
    </DashboardProvider>
  );
};

export default Page;
