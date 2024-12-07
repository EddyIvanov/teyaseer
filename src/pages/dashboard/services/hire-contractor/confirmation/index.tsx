import { ReactElement, useContext } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ContactorProvider, {
  ContractorContext,
} from '@/components/organism/dashboard/HireContractors/Contractors.context';
import { Confirmation } from '@/components/organism/dashboard/HireContractors/components';
import AppRoutes from '@/constants/AppRoutes';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const ConfirmContractors: NextPageWithLayout<any> = () => {
  const Context = useContext(ContractorContext);
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireContractor.Index
  );
  return <Confirmation />;
};
ConfirmContractors.getLayout = function getLayout(page: ReactElement) {
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

export default ConfirmContractors;
