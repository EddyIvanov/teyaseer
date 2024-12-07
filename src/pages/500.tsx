import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import { MainLayout, SidebarLayout } from '@/components/layouts';
import AppError from '@/components/molecules/AppError/AppError';
import useTranslation from '@/hooks/useTranslate';
import { NextPageWithLayout } from '@/pages/_app';

const isDashboardPage = () => {
  const router = useRouter();
  const currentURL = router.asPath;
  return currentURL.startsWith('/dashboard');
};

const NotFound: NextPageWithLayout<any> = () => {
  const { t } = useTranslation();
  return (
    <AppError
      status={500}
      errorTitle={t('500_sub_title')}
      errorDescription={t('500_error_description')}
    />
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  if (isDashboardPage()) {
    return <SidebarLayout>{page}</SidebarLayout>;
  }

  return <MainLayout alwaysOpaqueStyle>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default NotFound;
