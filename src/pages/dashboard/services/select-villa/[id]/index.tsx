import { ReactElement } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';

import { useRouter } from 'next/router';

import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import VillaDetailsSection from '@/components/renderings/VillaDetailsSection';
import { GetStaticErrorType } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import DashboardProvider from '@/providers/DashboardContext';
import {
  AssetType,
  ContentTypeResponseType,
  WebPage,
} from '@/types/ContentFul.type';

interface PreDesignVillaDetailsPageProps extends WebPage {
  logo: AssetType;
  fields: VillaType;
}

const PreDesignVillaDetailsPage: NextPageWithLayout<
  PreDesignVillaDetailsPageProps
> = (props: PreDesignVillaDetailsPageProps) => {
  return <VillaDetailsSection isInsideCustomerPortal {...props.fields} />;
};

PreDesignVillaDetailsPage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { t } = useTranslation();
  const { logo } = page.props as PreDesignVillaDetailsPageProps;
  return (
    <DashboardProvider>
      <SimpleHeaderLayout
        logo={logo}
        backBtn={{
          handleBack: () => {
            router.back();
          },
          label: t('back'),
        }}
      >
        <CalculatorContext>{page}</CalculatorContext>
      </SimpleHeaderLayout>
    </DashboardProvider>
  );
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
      content_type: 'villa',
      'sys.id': context.params!.id as string,
      locale: context.locale,
      include: 4,
    });

    const headerData: ContentTypeResponseType = await Client.getEntries({
      content_type: 'header',
      'fields.contentType': 'MainHeader',
      locale: context.locale,
      include: 2,
    });

    if (!page || headerData.items.length === 0) {
      throw {
        type: GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND,
      };
    }
    return {
      props: {
        logo: headerData.items[0].fields.logoBlack,
        fields: {
          ...page.items[0],
          contentType: page.items[0].fields.contentType,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default PreDesignVillaDetailsPage;
