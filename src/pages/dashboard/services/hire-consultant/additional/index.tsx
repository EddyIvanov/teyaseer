import { ReactElement, useContext } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import ConsultantProvider, {
  ConsultantContext,
} from '@/components/organism/dashboard/HireConsultants/Consultants.context';
import AdditionalConsultant from '@/components/organism/dashboard/HireConsultants/components/AdditionalConsultant';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const AdditionalConsultantPage: NextPageWithLayout<any> = () => {
  const Context = useContext(ConsultantContext);
  const { updateContextState, vendors, minSelected, maxSelected } = Context;
  const { t } = useTranslation();
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireConsultant.Index
  );
  return (
    <AdditionalConsultant
      vendors={vendors}
      minSelected={minSelected}
      maxSelected={maxSelected}
      updateContextState={updateContextState}
      vendorType={'consultants'}
      title={t('portal_hire_consultant_additional_vendors_title')}
      description={t('portal_hire_consultant_additional_description').replace(
        '{{number}}',
        `${maxSelected}`
      )}
    />
  );
};

AdditionalConsultantPage.getLayout = function getLayout(page: ReactElement) {
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

export default AdditionalConsultantPage;
