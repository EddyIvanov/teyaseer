import Client from '@/lib/contentFul';
import { ContentTypeResponseType, PageProps } from '@/types/ContentFul.type';
import { AR } from '@/types/localization.type';

type GetPageProps = {
  pageQuery: Record<string, string | string[] | number | undefined>;
  locale?: string;
  pageNormalizer?: (data: ContentTypeResponseType) => void;
  rawData?: boolean;
};

export const getPageProps = async ({
  pageQuery,
  locale = AR,
  pageNormalizer,
  rawData = false,
}: GetPageProps): Promise<PageProps | undefined> => {
  try {
    const pageData: ContentTypeResponseType = await Client.getEntries({
      ...pageQuery,
      locale,
    });

    const headerData = await Client.getEntries({
      content_type: 'header',
      'fields.contentType': 'MainHeader',
      locale,
      include: 10,
    });

    const footerData = await Client.getEntries({
      content_type: 'footer',
      locale,
      include: 10,
    });
    const hasPageData = pageData.items && pageData.items.length > 0;
    const hasHeaderData = headerData.items && headerData.items.length > 0;
    const hasFooterData = footerData.items && footerData.items.length > 0;

    if (!hasPageData || !hasHeaderData || !hasFooterData) {
      return undefined;
    }

    if (pageNormalizer !== undefined) {
      pageNormalizer(pageData);
    }

    return {
      ...pageData.items[0].fields,
      headerData: headerData.items[0].fields,
      footerData: footerData.items[0].fields,
      ...(rawData && {
        rawData: pageData,
      }),
    };
  } catch (error) {
    return undefined;
  }
};
