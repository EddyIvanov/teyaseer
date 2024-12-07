import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import ServiceDocuments from '@/components/organism/dashboard/ServiceDocuments';
import BackToServicesButton from '@/components/organism/dashboard/ServiceDocuments/components/BackToServicesButton';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

const UploadDocumentService: NextPageWithLayout<any> = () => {
  return <ServiceDocuments />;
};
UploadDocumentService.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout backToServicesButton={<BackToServicesButton />}>
        {page}
      </SidebarLayout>
    </DashboardProvider>
  );
};

export default UploadDocumentService;
