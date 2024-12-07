import { envVars } from '@/configs/env';
import { getArticleIds, getVillaIds } from '@/graphql/api';
import Client from '@/lib/contentFul';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const APP_URL = envVars.APP_URL;
const EN = 'en';
const AR = 'ar';
const DEFAULT_LOCAL = AR;
const LOCALS = [AR, EN];

const getLocalBaseUrl = (local: string) => {
  if (!local || local === DEFAULT_LOCAL) {
    return APP_URL;
  }
  return `${APP_URL}/${local}`;
};

const generateSiteMap = async (allUrls: string[]) => {
  try {
    return `<?xml version="1.0" encoding="UTF-8"?>
              <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${allUrls
                  .map(url => {
                    return `<url>
                    <loc>${url}</loc>
                  </url>`;
                  })
                  .join('')}
              </urlset>
            `;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function getServerSideProps({ res }: any) {
  const webpages = await getWebpages();
  const articleUrls = await getArticles();
  const villaUrls = await getVillas();
  const allUrls = [...webpages, ...articleUrls, ...villaUrls];
  const sitemap = await generateSiteMap(allUrls);
  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

// Load all the pages slugs from webpage contentful
export const getWebpages = async (query = {}) => {
  const webpages: ContentTypeResponseType = await Client.getEntries({
    content_type: 'webPage',
    include: 1,
    ...query,
  });
  return LOCALS.map(local => {
    return webpages.items.map(webpage => {
      const url = webpage.fields.slug;
      return `${getLocalBaseUrl(local)}/${url !== '/' ? url : ''}`;
    });
  }).flat();
};

// Load all the articles url from contentFul
const getArticles = async () => {
  const articleIds: { sys: { id: string } }[] = await getArticleIds();
  return LOCALS.map(local => {
    return articleIds.map(item => {
      return `${getLocalBaseUrl(local)}/support/articles/${item.sys.id}`;
    });
  }).flat();
};

// Load all the villas url from contentFul
const getVillas = async () => {
  const villaIds: { sys: { id: string } }[] = await getVillaIds();
  return LOCALS.map(local => {
    return villaIds.map(item => {
      return `${getLocalBaseUrl(local)}/villas/${item.sys.id}`;
    });
  }).flat();
};

const SiteMap = () => {};
export default SiteMap;
