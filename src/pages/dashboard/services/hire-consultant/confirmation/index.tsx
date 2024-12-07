import { ReactElement, useContext } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ConsultantProvider, {
  ConsultantContext,
} from '@/components/organism/dashboard/HireConsultants/Consultants.context';
import { Confirmation } from '@/components/organism/dashboard/HireConsultants/components';
import AppRoutes from '@/constants/AppRoutes';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import DashboardProvider from '@/providers/DashboardContext';

const YourVillaVisionPage: NextPageWithLayout<any> = () => {
  const Context = useContext(ConsultantContext);
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireConsultant.Index
  );
  return <Confirmation />;
};
YourVillaVisionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout hasBackToServices>
        <ConsultantProvider>
          <WithGuide guideId="find-teyaseer-qualified-consultant">
            <CalculatorContext>{page}</CalculatorContext>
          </WithGuide>
        </ConsultantProvider>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default YourVillaVisionPage;
