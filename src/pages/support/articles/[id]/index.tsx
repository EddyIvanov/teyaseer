import { ReactElement } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { HeadInfo } from '@/components';
import { MainLayout, RenderingLayout } from '@/components/layouts';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const WebPage: NextPageWithLayout<WebPage> = (props: WebPage) => {
  const { metaImage } = props;
  let descriptionText = documentToPlainTextString(
    props.renderings[0]?.fields?.fields?.description
  );

  if (descriptionText.length > 200) {
    descriptionText = descriptionText.substring(0, 200) + '...';
  }

  return (
    <>
      <HeadInfo
        metaDescription={descriptionText}
        metaTitle={props.renderings[0]?.fields?.fields?.title}
        openGraphImage={
          props?.renderings[0]?.fields?.fields?.image || metaImage
        }
      />
      <RenderingLayout renderings={props.renderings} />
    </>
  );
};

WebPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const page: ContentTypeResponseType = await Client.getEntries({
      content_type: 'news',
      'sys.id': context.params!.id as string,
      locale: context.locale,
      include: 4,
    });

    if (!page || page.items.length === 0) {
      throw {
        type: GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND,
      };
    }
    return {
      props: {
        renderings: [
          {
            fields: {
              ...page.items[0],
              contentType: page.items[0].fields.contentType,
            },
            sys: page.items[0].sys,
          },
        ],
      },
    };
  } catch (err: any) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default WebPage;
