import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { HeadInfo } from '@/components';
import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const VillaCalculatorSummary = dynamic(
  () =>
    import(
      '../../../components/organism/VillaCalculatorSummary/VillaCalculatorSummary'
    ).then(mod => mod.VillaCalculatorSummary),
  { ssr: false }
);

const VilaConfiguratorSummaryPage: NextPageWithLayout<WebPage> = ({
  metaTitle,
  metaDescription,
  metaImage,
}: WebPage) => (
  <>
    <HeadInfo
      metaDescription={metaDescription}
      metaTitle={metaTitle}
      openGraphImage={metaImage}
    />
    <VillaCalculatorSummary />
  </>
);

VilaConfiguratorSummaryPage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { t } = useTranslation();
  const logo = page?.props?.renderings
    ? page?.props?.renderings[0]?.fields?.logo
    : undefined;

  const handleBack = () => {
    router.push('/villa-configurator?backFromSummary=true');
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
      'fields.slug': 'villa-configurator/summary',
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

export default VilaConfiguratorSummaryPage;
