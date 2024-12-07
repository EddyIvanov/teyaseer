import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { NextPageWithLayout } from '../_app';

import { HeadInfo } from '@/components';
import { MainLayout, RenderingLayout } from '@/components/layouts';
import { OptimizeBeInspiredPageData } from '@/helpers/bundleReducer';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const WebPage: NextPageWithLayout<WebPage> = (props: WebPage) => {
  const { metaDescription, metaTitle, metaImage } = props;

  return (
    <>
      <HeadInfo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphImage={metaImage}
      />
      <RenderingLayout renderings={props.renderings} />
    </>
  );
};

WebPage.getLayout = function getLayout(page: ReactElement) {
  const { headerData, footerData } = page.props;

  return (
    <MainLayout
      headerData={headerData}
      footerData={footerData}
      fixFooter={page.props.fixFooter}
    >
      {page}
    </MainLayout>
  );
};

const normalizePageProps = (data: ContentTypeResponseType) => {
  if (data) {
    OptimizeBeInspiredPageData(data, 2);
  }
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const pageProps = await getPageProps({
      pageQuery: {
        content_type: 'webPage',
        'fields.slug': 'be-inspired',
        include: 4,
      },
      locale: context.locale,
      pageNormalizer: normalizePageProps,
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

export default WebPage;
