import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import Documents from '@/components/organism/dashboard/Documents';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const MyDocuments: NextPageWithLayout<any> = () => {
  return <Documents />;
};
MyDocuments.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>
        <WithGuide guideId={'my-documents-page'}>{page}</WithGuide>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default MyDocuments;
