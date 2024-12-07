import Client from '@/lib/contentFul';

export const getAppKeys = async (locale: string) => {
  try {
    const data: any = await Client.getEntries({
      content_type: 'appKey',
      locale: locale,
    });
    if (data.items) {
      const dt: any = {};
      for (const item of data.items) {
        dt[item.fields.key] = item.fields.displayText;
      }
      return dt;
    }
    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};
