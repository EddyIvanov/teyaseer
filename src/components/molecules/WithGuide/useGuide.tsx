import { useContext, useEffect, useState } from 'react';

import Client from '@/lib/contentFul';
import { Context } from '@/providers/MainContext';
import {
  ContentTypeResponseType,
  GuideItemFields,
} from '@/types/ContentFul.type';

export function useGuide(guideId: string) {
  const [guideData, setGuideData] = useState<undefined | GuideItemFields>();
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(Context);

  const fetchData = async (guideId: string) => {
    try {
      if (!guideId) return;
      setLoading(true);
      setGuideData(undefined);
      const guideItems: ContentTypeResponseType = await Client.getEntries({
        content_type: 'guide',
        'fields.slug': guideId,
        locale: locale,
        include: 2,
      });

      if (guideItems?.items.length > 0) {
        setGuideData(guideItems.items[0].fields);
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(guideId);
  }, [guideId, locale]);
  return { loading, guideData, fetchData };
}
