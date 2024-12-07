import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import PreDesignVillas from '@/components/organism/dashboard/services/PreDesignVillas';
import {
  VillaDesignType,
  VillaType,
} from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import { OptimizeSelectVillaPageData } from '@/helpers/bundleReducer';
import { GetStaticErrorType } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';
import {
  AssetType,
  ContentTypeResponseType,
  WebPage,
} from '@/types/ContentFul.type';

interface PreDesignVillaPageProps extends WebPage {
  logo: AssetType;
  villas: VillaType[];
  preDesignVilla: VillaDesignType;
}

const PreDesignVillaPage: NextPageWithLayout<PreDesignVillaPageProps> = (
  props: PreDesignVillaPageProps
) => {
  return (
    <PreDesignVillas
      initialVillas={props.villas}
      preDesignVilla={props.preDesignVilla}
    />
  );
};

PreDesignVillaPage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { t } = useTranslation();
  const { logo } = page.props as PreDesignVillaPageProps;

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
        {page}
      </SimpleHeaderLayout>
    </DashboardProvider>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const villasList: ContentTypeResponseType = await Client.getEntries({
      content_type: 'villa',
      locale: context.locale,
      include: 4,
      limit: 10,
      order: 'fields.id' as any,
    });

    const preDesignVilla: ContentTypeResponseType = await Client.getEntries({
      content_type: 'villaDesign',
      'fields.contentType': 'PreDesignVilla',
      locale: context.locale,
      include: 4,
    });

    const headerData: ContentTypeResponseType = await Client.getEntries({
      content_type: 'header',
      'fields.contentType': 'MainHeader',
      locale: context.locale,
      include: 2,
    });

    if (!villasList || !preDesignVilla || headerData.items.length === 0) {
      throw {
        type: GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND,
      };
    }
    OptimizeSelectVillaPageData(villasList);
    return {
      props: {
        logo: headerData.items[0].fields.logoBlack,
        villas: villasList.items,
        preDesignVilla: preDesignVilla.items[0],
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default PreDesignVillaPage;
