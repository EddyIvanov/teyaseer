import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { Hide, Show, useMediaQuery } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

import { NextPageWithLayout } from './_app';

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

const Home: NextPageWithLayout<WebPage> = ({
  metaDescription,
  metaTitle,
  metaImage,
  error,
  renderings,
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
        {renderings.length && (
          <HomeSlider>
            {RendringASItems({
              renderings: renderings,
              renderComponentsAs: SwiperSlide,
            })}
          </HomeSlider>
        )}
      </Show>
      <Hide above="lg">
        <RenderingLoader renderings={renderings} />
      </Hide>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  return (
    <MainLayout
      withScrollAnimation={true}
      fixFooter={page.props.fixFooter}
      updateHeaderStyleOnScroll={isLargerThan1024 ? false : true}
      headerData={page.props.headerData}
      footerData={page.props.footerData}
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
        'fields.slug': '/',
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

export default Home;
