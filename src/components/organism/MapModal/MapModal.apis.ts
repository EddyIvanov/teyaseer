import { AddressList } from './MapModal.type';

import Client from '@/lib/contentFul';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

export const getMapData = async (
  locale: string
): Promise<AddressList | undefined> => {
  try {
    const data: ContentTypeResponseType = await Client.getEntries({
      content_type: 'mapData',
      locale: locale,
      include: 10,
    });
    if (data.items && data.items.length > 0) return data.items[0].fields;
  } catch (error) {
    return undefined;
  }
};
