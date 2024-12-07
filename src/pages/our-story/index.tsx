import { ReactElement, useEffect, useState } from 'react';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import { NextPageWithLayout } from '../_app';

import { HeadInfo } from '@/components';
import {
  MainLayout,
  RenderingLayout as RenderingLoader,
} from '@/components/layouts';
import MapModal from '@/components/organism/MapModal/MapModal';
import { getPageProps } from '@/helpers/getPageProps';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import { WebPage } from '@/types/ContentFul.type';

const OurStory: NextPageWithLayout<WebPage> = (props: WebPage) => {
  const router = useRouter();
  const [isOpen, setISopen] = useState(false);
  const { metaDescription, metaTitle, metaImage } = props;
  const toggleModal = () => {
    setISopen(!isOpen);
  };

  useEffect(() => {
    if (router.asPath.includes('#openMap')) {
      toggleModal();
      router.push(router.pathname, router.pathname, {
        shallow: true,
        scroll: false,
      });
    }
  }, [router.asPath]);
  return (
    <>
      <HeadInfo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphImage={metaImage}
      />
      <RenderingLoader renderings={props.renderings} />
      <MapModal isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

OurStory.getLayout = function getLayout(page: ReactElement) {
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
        'fields.slug': 'our-story',
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

export default OurStory;
