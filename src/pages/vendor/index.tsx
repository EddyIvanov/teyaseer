import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { Hide, Show } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

import { NextPageWithLayout } from '../_app';

import { HeadInfo } from '@/components';
import {
  MainLayout,
  RenderingLayout as RenderingLoader,
} from '@/components/layouts';
import { RendringASItems } from '@/components/layouts/RenderingLayout/RenderingLayout';
import AppError from '@/components/molecules/AppError/AppError';
import HomeSlider from '@/components/molecules/HomeSlider/HomeSlider';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import useFooterUpdateOnOrientationChange from '@/hooks/useFooterUpdateOnOrientationChange';
import { WebPage } from '@/types/ContentFul.type';

const Vendor: NextPageWithLayout<WebPage> = ({
  metaTitle,
  metaDescription,
  metaImage,
  renderings,
  error,
}: WebPage) => {
  useFooterUpdateOnOrientationChange();

  if (error) {
    return <AppError {...error} />;
  }

  return (
    <>
      <HeadInfo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphImage={metaImage}
      />
      <Show above="lg">
        {renderings.length ? (
          <HomeSlider>
            {RendringASItems({
              renderings: renderings,
              renderComponentsAs: SwiperSlide,
            })}
          </HomeSlider>
        ) : null}
      </Show>
      <Hide above="lg">
        <RenderingLoader renderings={renderings} />
      </Hide>
    </>
  );
};

Vendor.getLayout = function getLayout(page: ReactElement) {
  const { headerData, footerData } = page.props;

  return (
    <MainLayout
      headerData={headerData}
      footerData={footerData}
      withScrollAnimation={true}
      fixFooter={page.props.fixFooter}
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
        'fields.slug': 'vendor',
        include: 2,
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

export default Vendor;
