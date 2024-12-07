import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import { HeadInfo } from '@/components';
import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import VillaCalculatorComponent from '@/components/organism/VillaCalculator/VillaCalculator';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const VilaCofiguratorPage: NextPageWithLayout<WebPage> = ({
  metaTitle,
  metaDescription,
  metaImage,
  renderings,
}: WebPage) => (
  <>
    <HeadInfo
      metaDescription={metaDescription}
      metaTitle={metaTitle}
      openGraphImage={metaImage}
    />
    {renderings && renderings[0] && renderings[0].fields && (
      <VillaCalculatorComponent {...renderings[0].fields} />
    )}
  </>
);

VilaCofiguratorPage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { t } = useTranslation();
  const logo = page?.props?.renderings
    ? page?.props?.renderings[0]?.fields?.logo
    : undefined;

  const handleBack = () => {
    if (router.query.backFromSummary) {
      window?.history?.go(-3);
    } else {
      router.back();
    }
  };
  return (
    <CalculatorContext>
      <SimpleHeaderLayout
        logo={logo}
        backBtn={{
          handleBack,
          label: t('back'),
        }}
      >
        {page}
      </SimpleHeaderLayout>
    </CalculatorContext>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const page: ContentTypeResponseType = await Client.getEntries({
      content_type: 'webPage',
      'fields.slug': 'villa-configurator',
      locale: context.locale,
      include: 10,
    });

    if (!page || page.items.length === 0) {
      throw {
        type: GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND,
      };
    }
    return {
      props: {
        ...page.items[0].fields,
      },
    };
  } catch (err) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default VilaCofiguratorPage;
