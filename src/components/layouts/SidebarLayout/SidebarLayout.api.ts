import { HeaderDataType } from './SidebarLayout.type';

import Client from '@/lib/contentFul';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

export const getHeaderData = async (
  locale: string
): Promise<HeaderDataType | undefined> => {
  try {
    const data: ContentTypeResponseType = await Client.getEntries({
      content_type: 'header',
      'fields.contentType': 'PortalHeader',
      locale: locale,
      include: 10,
    });
    if (data.items && data.items.length > 0) return data.items[0].fields;
  } catch (error) {
    return undefined;
  }
};
