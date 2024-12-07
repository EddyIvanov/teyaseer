import { getVillasByFilterQueries } from '@/graphql/api';
import { getVillasFromGraphQLResponse } from '@/helpers/villas';
import Client from '@/lib/contentFul';

export const getFilteredVillasByQuery = async (
  locale = 'ar',
  limit = 10,
  query: any,
  page: number
) => {
  let filteredVillas: any[] = [];

  const filteredVillasQuery = await getVillasByFilterQueries(
    locale,
    limit,
    query,
    page
  );

  const [filteredVillasResponse] = await Promise.allSettled([
    filteredVillasQuery,
  ]);

  filteredVillas = getVillasFromGraphQLResponse(filteredVillasResponse);

  return filteredVillas;
};

export const getVillaById = async (
  id: string,
  locale: string
): Promise<any> => {
  const villaRes = await Client.getEntries({
    content_type: 'villa',
    'sys.id': id,
    locale: locale,
    include: 4,
  });

  return villaRes.items[0];
};
