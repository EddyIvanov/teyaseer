import { ReactElement, useContext } from 'react';

import Script from 'next/script';

import { SidebarLayout } from '@/components/layouts';
import { envVars } from '@/configs/env';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider, {
  DashboardContext,
} from '@/providers/DashboardContext';

const MyProfile: NextPageWithLayout<any> = () => {
  const { user } = useContext(DashboardContext);
  const dataUrl = `${envVars.CALENDLY.BASE_URL}?utm_source=${user?.userInfo.emiratesId}&email=${user?.userInfo.email}&name=${user?.userInfo.nameAr}`;
  if (!user) return null;
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />

      <div
        className="calendly-inline-widget"
        data-url={dataUrl}
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </>
  );
};
MyProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>{page}</SidebarLayout>
    </DashboardProvider>
  );
};

export default MyProfile;
