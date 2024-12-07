import { ReactElement } from 'react';

import { SidebarLayout } from '@/components/layouts';
import Stages from '@/components/organism/dashboard/Stages/Stages';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';

export const servicesConst = [
  'your-requirements',
  'hire-consultant',
  'select-contractor',
  'design-your-vila',
  'build-your-vila',
  'your-handover',
];

const AllServices: NextPageWithLayout<any> = () => {
  return <Stages />;
};

AllServices.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>{page}</SidebarLayout>
    </DashboardProvider>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  if (!servicesConst.includes(id)) {
    return {
      notFound: true,
    };
  }
  return { props: {} };
};

export default AllServices;
