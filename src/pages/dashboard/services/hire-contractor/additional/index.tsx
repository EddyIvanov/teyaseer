import { ReactElement, useContext } from 'react';

import { SidebarLayout } from '@/components/layouts';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import AdditionalConsultant from '@/components/organism/dashboard/HireConsultants/components/AdditionalConsultant';
import ContractorProvider, {
  ContractorContext,
} from '@/components/organism/dashboard/HireContractors/Contractors.context';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const AdditionalConsultantPage: NextPageWithLayout<any> = () => {
  const Context = useContext(ContractorContext);
  const { updateContextState, vendors, minSelected, maxSelected } = Context;
  const { t } = useTranslation();
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireContractor.Index
  );
  return (
    <AdditionalConsultant
      vendors={vendors}
      minSelected={minSelected}
      maxSelected={maxSelected}
      updateContextState={updateContextState}
      vendorType={'contractors'}
      title={t('portal_hire_contractor_additional_title')}
      description={t('portal_hire_contractor_additional_description').replace(
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
        <ContractorProvider>
          <WithGuide guideId="find-teyaseer-qualified-contractor">
            {page}
          </WithGuide>
        </ContractorProvider>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default AdditionalConsultantPage;
