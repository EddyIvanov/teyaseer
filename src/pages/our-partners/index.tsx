import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { NextPageWithLayout } from '../_app';

import { HeadInfo } from '@/components';
import { MainLayout, RenderingLayout } from '@/components/layouts';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import { WebPage } from '@/types/ContentFul.type';

const OurPartnersPage: NextPageWithLayout<WebPage> = ({
  metaTitle,
  metaDescription,
  metaImage,
  renderings,
  title,
}: WebPage) => {
  return (
    <>
      <HeadInfo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphImage={metaImage}
      />
      <RenderingLayout renderings={renderings} title={title || ''} />
    </>
  );
};

OurPartnersPage.getLayout = function getLayout(page: ReactElement) {
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
        'fields.slug': 'our-partners',
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
  } catch (err) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default OurPartnersPage;
