import { ReactElement, useContext } from 'react';

// import { useRouter } from 'next/router';

import { useRouter } from 'next/router';

import { SidebarLayout } from '@/components/layouts';
import ConsultantProvider, {
  ConsultantContext,
} from '@/components/organism/dashboard/HireConsultants/Consultants.context';
import ServiceDocuments from '@/components/organism/dashboard/ServiceDocuments';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const UploadDocumentsPage: NextPageWithLayout<any> = () => {
  const router = useRouter();
  const Context = useContext(ConsultantContext);
  const { t } = useTranslation();
  const { serviceRequestId } = Context;
  useUnloadUnsaveConsultant(
    Context,
    AppRoutes.Dashboard.Services.HireConsultant.Index
  );
  const onSubmit = () => {
    router.push(AppRoutes.Dashboard.Services.HireConsultant.Confirmation);
  };
  return (
    <ServiceDocuments
      serviceRequestId={serviceRequestId}
      stepTemplateId="T__Appointment_of_Consultant__ST__Confirm_Consultant_Bidder_List"
      useAsComponent
      shouldUploadMySelf
      showButtons={['portal_request_upload_document_myself']}
      onFinish={onSubmit}
      guideId="find-teyaseer-qualified-consultant"
      showSamples={false}
      hasOptionalUpload
      customTitle={t('portal_consultant_upload_documents_title')}
      customDescription={t('portal_consultant_upload_documents_description')}
    />
  );
};
UploadDocumentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout hasBackToServices>
        <ConsultantProvider>{page}</ConsultantProvider>
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default UploadDocumentsPage;
