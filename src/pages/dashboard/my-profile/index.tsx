import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import Profile from '@/components/organism/dashboard/Profile';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import DashboardProvider from '@/providers/DashboardContext';

const MyProfile: NextPageWithLayout<any> = () => {
  return <Profile />;
};

MyProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <CalculatorContext>
        <SidebarLayout>{page}</SidebarLayout>
      </CalculatorContext>
    </DashboardProvider>
  );
};

export default MyProfile;
