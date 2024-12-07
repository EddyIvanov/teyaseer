import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { Card, CardBody } from '@chakra-ui/react';

import { SidebarLayout } from '@/components/layouts';
import { SupportSearchSection } from '@/components/renderings/SupportSearchSection/SupportSearchSection';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';
import { ContentTypeResponseType, WebPage } from '@/types/ContentFul.type';

const Index: NextPageWithLayout<WebPage> = (props: WebPage) => {
  return (
    <Card
      borderWidth="1px"
      borderRadius="2xl"
      borderColor="border"
      direction="column"
      padding="0"
      minWidth={'100%'}
    >
      <CardBody>
        <SupportSearchSection
          {...props}
          hasTopMargin={false}
          defaultSearchId={'WebPortalAndMobile'}
        />
        ;
      </CardBody>
    </Card>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>{page}</SidebarLayout>
    </DashboardProvider>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const page: ContentTypeResponseType = await Client.getEntries({
      content_type: 'webPage',
      'fields.slug': 'support-search-page',
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
  } catch (err: any) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default Index;
