import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { SidebarLayout } from '@/components/layouts';
import { Support } from '@/components/organism/dashboard/Support/Support';
import { Category } from '@/components/renderings/ArticleCategorySection/ArticleCategorySection.type';
import { GetStaticErrorType, normalizeGetStaticError } from '@/helpers/utils';
import Client from '@/lib/contentFul';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardProvider from '@/providers/DashboardContext';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

type T_Search = {
  fields: { categories: Array<Category> };
};

const Supports: NextPageWithLayout<T_Search> = (props: T_Search) => {
  const categories = props.fields.categories;
  return <>{categories ? <Support categories={categories} /> : null}</>;
};
Supports.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardProvider>
      <SidebarLayout>{page}</SidebarLayout>
    </DashboardProvider>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const page: ContentTypeResponseType = await Client.getEntries({
      content_type: 'categoriesList',
      'fields.searchId': 'WebPortalAndMobile',
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
        ...page.items[0],
      },
    };
  } catch (err) {
    return {
      props: normalizeGetStaticError(err),
    };
  }
};

export default Supports;
