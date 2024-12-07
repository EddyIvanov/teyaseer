import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import SelectContractor from '@/components/organism/dashboard/SelectContractor';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const SelectContractorList: NextPageWithLayout<any> = () => {
  return <SelectContractor />;
};
SelectContractorList.getLayout = function getLayout(page: ReactElement) {
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

export default SelectContractorList;
