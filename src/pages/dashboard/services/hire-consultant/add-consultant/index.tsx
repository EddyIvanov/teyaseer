import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import { AddContractorConsultant } from '@/components/renderings/AddContractorConsultant/AddContractorConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const Index: NextPageWithLayout<any> = () => {
  return <AddContractorConsultant isConsultant />;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout hasBackToServices>
        <WithGuide guideId="find-teyaseer-qualified-consultant">
          {page}
        </WithGuide>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default Index;
