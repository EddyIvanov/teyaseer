import { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/types';

import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';
import { VillaCalculatorSummary } from '@/components/organism/VillaCalculatorSummary/VillaCalculatorSummary';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import CalculatorContext from '@/providers/CalculatorContext';
import DashboardProvider from '@/providers/DashboardContext';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const VilaConfiguratorSummaryPage = () => <VillaCalculatorSummary />;

VilaConfiguratorSummaryPage.getLayout = function getLayout(page: ReactElement) {
  const { logo } = page.props;
  const router = useRouter();
  const { t } = useTranslation();

  const { id } = router.query;

  const handleBack = () => {
    // indication that user navigated to /summary from /profile
    if (id) {
      return router.back();
    }
    return router.push(
      '/dashboard/services/villa-configurator?backFromSummary=true'
    );
  };

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

export default VilaConfiguratorSummaryPage;
