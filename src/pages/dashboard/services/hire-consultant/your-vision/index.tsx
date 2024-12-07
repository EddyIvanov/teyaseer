import { ReactElement, useContext } from 'react';

import { useRouter } from 'next/router';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ConsultantProvider, {
  ConsultantContext,
} from '@/components/organism/dashboard/HireConsultants/Consultants.context';
import YourVillaVision from '@/components/organism/dashboard/HireConsultants/components/YourVillaVision/YourVillaVision';
import AppRoutes from '@/constants/AppRoutes';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const YourVillaVisionPage: NextPageWithLayout<any> = () => {
  const router = useRouter();
  const Context = useContext(ConsultantContext);
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireConsultant.Index
  );
  const onSubmit = () => {
    const redirectUrl =
      AppRoutes.Dashboard.Services.HireConsultant.UploadDocuments;
    router.push(redirectUrl);
  };
  return <YourVillaVision onSubmit={onSubmit} />;
};
YourVillaVisionPage.getLayout = function getLayout(page: ReactElement) {
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

export default YourVillaVisionPage;
