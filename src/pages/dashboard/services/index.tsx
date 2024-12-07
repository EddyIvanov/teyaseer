import { ReactElement, useContext, useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { SidebarLayout } from '@/components/layouts';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider, {
  DashboardContext,
} from '@/providers/DashboardContext';
import colors from '@/styles/themes/brand/colors';

const Page: NextPageWithLayout<any> = () => {
  const { serviceStages, updateCurrentStage } = useContext(DashboardContext);
  const { locale } = useRouter();

  useEffect(() => {
    if (serviceStages.length === 0) return;
    const abortController = new AbortController();
    updateCurrentStage(abortController);
    return () => {
      abortController.abort();
    };
  }, [serviceStages.length, locale]);

  return (
    <Flex flexDirection={{ base: 'column', xl: 'row' }} flex={1} gap={'40px'}>
      <Flex flex={1} w="100%">
        <CenteredLoader variant="serviceDetailsSkeleton" />
      </Flex>
      <Flex
        w={{ base: '100%', xl: '340px' }}
        bg={colors.background}
        borderRadius={'normal'}
        maxH={'300px'}
        p={'15px'}
      >
        <CenteredLoader variant="guideSkeleton" />
      </Flex>
    </Flex>
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
