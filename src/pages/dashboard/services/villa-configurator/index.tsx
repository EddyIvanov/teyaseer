import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import VillaCalculatorComponent from '@/components/organism/VillaCalculator/VillaCalculator';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import CalculatorContext from '@/providers/CalculatorContext';
import DashboardProvider from '@/providers/DashboardContext';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const VilaCofiguratorPage: NextPageWithLayout<any> = props => {
  return <VillaCalculatorComponent {...{ ...props }} />;
};

VilaCofiguratorPage.getLayout = function getLayout(page: ReactElement) {
  const { logo } = page.props;
  const router = useRouter();
  const { t } = useTranslation();

  function handleBack() {
    if (router.query.backFromSummary === 'true') {
      return router.push('/dashboard/services/your-requirements');
    }
    router.back();
  }

  return (
    <DashboardProvider>
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
    </DashboardProvider>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const page: ContentTypeResponseType = await Client.getEntries({
      content_type: 'villaCostEstimator',
      locale: context.locale,
      include: 2,
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
