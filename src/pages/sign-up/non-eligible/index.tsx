import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { HeadInfo } from '@/components';
import MainLayout from '@/components/layouts/MainLayout/';
import RenderingLoader from '@/components/layouts/RenderingLayout';
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
      <RenderingLoader renderings={props.renderings} />
    </>
  );
};

WebPage.getLayout = function getLayout(page: ReactElement) {
  const { headerData, footerData } = page.props;
  return (
    <MainLayout headerData={headerData} footerData={footerData}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const pageProps = await getPageProps({
      pageQuery: {
        content_type: 'webPage',
        'fields.slug': 'non-eligible',
        include: 3,
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
