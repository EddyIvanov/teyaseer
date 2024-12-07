import { ReactElement } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { getWebpages } from '../sitemap.xml';

import { HeadInfo } from '@/components';
import { MainLayout, RenderingLayout } from '@/components/layouts';
import { envVars } from '@/configs/env';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { WebPage } from '@/types/ContentFul.type';

const WebPage: NextPageWithLayout<WebPage> = (props: WebPage) => {
  const { metaTitle, metaDescription, metaImage } = props;

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
  const { whiteHeader, fixFooter, headerData, footerData } = page.props;

  return (
    <MainLayout
      alwaysOpaqueStyle={whiteHeader}
      fixFooter={fixFooter}
      headerData={headerData}
      footerData={footerData}
    >
      {page}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const APP_URL = envVars.APP_URL;
  let slugs = await getWebpages({ 'fields.isDynamicPage': true });
  slugs = slugs.map(slug => slug.replace(APP_URL, ''));
  return {
    paths: slugs,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const slug = context.params?.slug;
    const pageProps = await getPageProps({
      pageQuery: {
        content_type: 'webPage',
        'fields.slug': slug,
        include: 10,
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

export default WebPage;
