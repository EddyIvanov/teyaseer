import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { NextPageWithLayout } from '../../_app';

import { MainLayout } from '@/components/layouts';
import { SupportSearchSection } from '@/components/renderings/SupportSearchSection/SupportSearchSection';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import { WebPage } from '@/types/ContentFul.type';

const SupportSearch: NextPageWithLayout<WebPage> = (props: WebPage) => {
  return <SupportSearchSection {...props} />;
};

SupportSearch.getLayout = function getLayout(page: ReactElement) {
  const { headerData, footerData } = page.props;

  return (
    <MainLayout
      headerData={headerData}
      footerData={footerData}
      alwaysOpaqueStyle
    >
      {page}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const pageProps = await getPageProps({
      pageQuery: {
        content_type: 'webPage',
        'fields.slug': 'support-search-page',
        include: 4,
      },
      locale: context.locale,
    });

    if (!pageProps) {
      throw {
        type: GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND,
      };
    }
    return {
      props: {
        ...pageProps,
      },
    };
  } catch (err: any) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default SupportSearch;
