import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import SelectConsultant from '@/components/organism/dashboard/SelectConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const SelectContractorList: NextPageWithLayout<any> = () => {
  return <SelectConsultant />;
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
