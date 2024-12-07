import { ReactElement } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { HeadInfo } from '@/components';
import { MainLayout, RenderingLayout } from '@/components/layouts';
import { OptimizeVillaListPage } from '@/helpers/bundleReducer';
import { getPageProps } from '@/helpers/getPageProps';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const WebPage: NextPageWithLayout<WebPage> = ({
  metaImage,
  renderings,
  title,
  metaDescription,
}: WebPage) => {
  let metaPageTitle = '';
  let metaPageDescription = '';
  let metaPageImage: any = null;
  if (renderings[0].fields.contentType === 'VillaListSection') {
    metaPageTitle = title as string;
    metaPageDescription = metaDescription;
    metaPageImage = metaImage;
  } else if (
    renderings[0].fields.fields.contentType === 'VillaDetailsSection'
  ) {
    let descriptionText = documentToPlainTextString(
      renderings[0]?.fields?.fields?.shortDescription
    );

    if (descriptionText.length > 200) {
      descriptionText = descriptionText.substring(0, 200) + '...';
    }

    metaPageTitle = renderings[0].fields.fields.title;
    metaPageDescription = descriptionText;
    metaPageImage = renderings[0]?.fields?.fields?.images[0];
  }

  return (
    <>
      <HeadInfo
        metaTitle={metaPageTitle}
        metaDescription={metaPageDescription}
        openGraphImage={metaPageImage || metaImage}
      />
      <RenderingLayout renderings={renderings} />
    </>
  );
};

WebPage.getLayout = function getLayout(page: ReactElement) {
  const { headerData, footerData } = page.props;

  return (
    <MainLayout
      headerData={headerData}
      footerData={footerData}
      alwaysOpaqueStyle
    >
      <CalculatorContext>{page}</CalculatorContext>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const normalizeVilaListPageProps = (data: ContentTypeResponseType, id: any) => {
  if (data) {
    OptimizeVillaListPage(data, id);
  }
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const pathsArray = ['traditional', 'modern'];
    if (pathsArray.includes(context.params!.id as string)) {
      const pageProps = await getPageProps({
        pageQuery: {
          content_type: 'webPage',
          'fields.slug': 'villa-list',
          include: 4,
        },
        locale: context.locale,
        pageNormalizer: data =>
          normalizeVilaListPageProps(data, context?.params?.id),
      });

      if (!pageProps) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          ...pageProps,
        },
      };
    } else {
      const pageProps = await getPageProps({
        pageQuery: {
          content_type: 'villa',
          'sys.id': context.params!.id as string,
          include: 4,
        },
        locale: context.locale,
        rawData: true,
      });

      if (!pageProps) {
        return {
          notFound: true,
        };
      }
      const { rawData, headerData, footerData } = pageProps;

      return {
        props: {
          renderings: [
            {
              fields: {
                ...rawData?.items[0],
                contentType: rawData?.items[0].fields.contentType,
              },
              sys: rawData?.items[0].sys,
            },
          ],
          headerData,
          footerData,
        },
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default WebPage;
