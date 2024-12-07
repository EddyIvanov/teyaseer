import { ReactElement } from 'react';

import { useRouter } from 'next/router';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ContactorProvider from '@/components/organism/dashboard/HireContractors/Contractors.context';
import { SelectContractors } from '@/components/organism/dashboard/HireContractors/components';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const HireContractors: NextPageWithLayout<any> = () => {
  const router = useRouter();
  const onSubmit = () => {
    router.push(`/dashboard/services/hire-contractor/confirmation`);
  };
  return <SelectContractors onSubmit={onSubmit} />;
};

HireContractors.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout hasBackToServices>
        <ContactorProvider>
          <WithGuide guideId="find-teyaseer-qualified-contractor">
            {page}
          </WithGuide>
        </ContactorProvider>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default HireContractors;
