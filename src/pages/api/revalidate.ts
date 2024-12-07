import type { NextApiResponse } from 'next';

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

import { envVars } from '@/configs/env';

const list = [
  '/dashboard/',
  '/dashboard/supports',
  '/dashboard/supports/search',
  '/dashboard/villa-configurator',
  '/dashboard/villa-configurator/summary',
  '/dashboard/select-villa',
];

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const secretToken = req.headers.secret;
  if (secretToken !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN)
    return res.status(401).json({ message: 'Not Authorized' });

  try {
    try {
      const xmlData = await getDataFromSiteMap();
      const jsonUrls = getJsonUrls(xmlData);
      const extraUrls = await getExtraUrls();
      const allUrls = [...jsonUrls, ...extraUrls];
      setImmediate(async () => {
        for (const item of allUrls) {
          try {
            await res.revalidate(`${item}`);
          } catch (err: any) {
            console.error(
              `Error revalidating ${item} with error: ${err.message}`
            );
          }
        }
      });
      return res.status(200).send({
        revalidate_count: allUrls.length,
        revalidate: true,
      });
    } catch (error: any) {
      return res.status(500).send(error);
    }
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

const getDataFromSiteMap = async () => {
  const url = `${envVars.APP_URL}/sitemap.xml`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  const xml = response.data;
  const parser = new XMLParser();
  const data = parser.parse(xml);
  return data.urlset.url;
};

const getJsonUrls = (list: { loc: string }[]) => {
  let urls: string[] = [];
  list.forEach((itm: { loc: string }) => {
    urls.push(itm.loc.replace(envVars.APP_URL, ''));
  });
  urls = [...urls, ...getVillas(list)];
  return urls;
};

const getVillas = (list: { loc: string }[]): string[] => {
  const urls = list
    .filter((itm: { loc: string }) => {
      if (itm.loc.includes('/villas/')) {
        return itm;
      }
    })
    .map((itm: { loc: string }) => {
      return itm.loc.replace(envVars.APP_URL, '').split('/').pop();
    })
    .filter((itm: any, index: number, self: any[]) => {
      return index === self.indexOf(itm);
    })
    .map((itm: any) => {
      return `/dashboard/services/select-villa/${itm}`;
    });
  [...urls].forEach((itm: string) => {
    urls.push(`/en${itm}`);
  });
  return urls;
};

const getExtraUrls = async () => {
  const urls: string[] = [];
  list.forEach((itm: string) => {
    urls.push(itm);
    urls.push(`/en${itm}`);
  });
  // TODO: load the list of dashboard/services/[id]/description pages will need later on
  // const descriptions: ContentTypeResponseType = await Client.getEntries({
  //   content_type: 'serviceDescriptionPage',
  //   include: 4,
  // });
  // descriptions.items.forEach((itm: any) => {
  //   const url = itm.fields.slug;
  //   urls.push(url);
  //   urls.push(`/en${url}`);
  // });
  return urls;
};
