import { ReactElement } from 'react';

import { useRouter } from 'next/router';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ConsultantProvider from '@/components/organism/dashboard/HireConsultants/Consultants.context';
import SelectConsultants from '@/components/organism/dashboard/HireConsultants/components/SelectConsultants';
import AppRoutes from '@/constants/AppRoutes';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const HireConsultants: NextPageWithLayout<any> = () => {
  const router = useRouter();
  const onSubmit = () => {
    router.push(AppRoutes.Dashboard.Services.HireConsultant.YourVision);
  };
  return <SelectConsultants onSubmit={onSubmit} />;
};

HireConsultants.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout hasBackToServices>
        <ConsultantProvider>
          <WithGuide guideId="find-teyaseer-qualified-consultant">
            {page}
          </WithGuide>
        </ConsultantProvider>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default HireConsultants;
