import { SupportCategory } from '@/components/molecules/SupportSearchCategory/SupportSearchCategory.types';
import { envVars } from '@/configs/env';

export async function fetchGraphQL(query: string) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${envVars.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${envVars.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envVars.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  )
    .then(result => result.json())
    .catch(error => {
      console.error('Error while querying', { error });
    });
}

export async function getSearchedCategories(
  query: string,
  searchId: string,
  locale = 'ar',
  limit = 10
) {
  const categories = await fetchGraphQL(
    `query {
        categoriesListCollection(
            locale: "${locale}" 
            ${searchId ? `where: { searchId: "${searchId}" }` : ''}
            limit: ${limit}
        ) {
            items {
                categoriesCollection(
                limit: ${limit} 
                where: {
                    content: {
                        OR: [ 
                                { title_contains: "${query}"}, 
                                { content_contains: "${query}" }
                            ]
                        }
                    }
                ) {
                    items {
                      sys {
                        id
                      }
                      title
                      contentCollection(
                          where:{
                              OR: [ 
                                    { title_contains: "${query}" }, 
                                    { content_contains: "${query}" }
                              ]
                          }
                      ) {
                          items {
                              sys {
                                id
                              }
                              title
                              content {
                                  json
                              }
                          }
                      }
                  }
              }
          }
      }
  }`
  );

  const flattenedContentItems =
    categories?.data?.categoriesListCollection?.items?.reduce(
      (
        acc: any,
        item: { categoriesCollection: { items: Array<SupportCategory> } }
      ) => {
        const items = item?.categoriesCollection?.items ?? [];
        return acc.concat(items);
      },
      [] as SupportCategory[] | []
    );

  return flattenedContentItems || [];
}

export async function getAllCategories(
  locale = 'ar',
  limit = 10,
  searchId?: string | null
) {
  const categories = await fetchGraphQL(
    `query {
        categoriesListCollection(
            locale: "${locale}" 
            ${searchId ? `where: { searchId: "${searchId}" }` : ''}
            limit: ${limit}
        ) {
            items {
                categoriesCollection( limit: ${limit} ) {
                    items {
                      sys {
                        id
                      }
                      title
                      contentCollection {
                          items {
                              sys {
                                id
                              }
                              title
                              content {
                                  json
                              }
                          }
                      }
                  }
              }
          }
      }
  }`
  );

  return categories?.data?.categoriesListCollection?.items.flatMap(
    (item: any) => item?.categoriesCollection.items
  );
}

export async function getEmptyCategoryText(locale = 'ar') {
  const response = await fetchGraphQL(
    `query {
      noSearchText(id: "2KaqnGz7aL6WbwNVtj5gPs", locale:"${locale}") {
        description {
          json
        }
        iconName
      }
    }`
  );
  return response?.data?.noSearchText;
}

export async function getFeaturedArticles(locale = 'ar') {
  const response = await fetchGraphQL(
    `query {
      newsCollection(locale: "${locale}", order: sys_firstPublishedAt_ASC, where: { isFeatured: true }) {
        items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        image {
          contentType
          fileName
          title
          url
        }
      }
    }
  }`
  );
  return response?.data?.newsCollection?.items;
}

export async function getArticleIds() {
  const response = await fetchGraphQL(
    `query {
      newsCollection(locale: "en", order: sys_firstPublishedAt_ASC) {
        items {
          sys {
            id
          }
        }
      }
    }`
  );
  return response?.data?.newsCollection?.items;
}

const villaAllDetailsQuery = `
 {
  items {
    title
    specificationsCollection {
      items {
        title
        value
        numberValue
        fieldName
        showInList
        iconName
      }
    }
    description {
      json
    }
    imagesCollection {
      items {
        title
        description
        url
        sys {
          id
        }
      }
    }
    contentType
    category
    isFeatured
    shortDescription {
      json
    }
    learnMore {
      label
      href
      target
      iconName
    }
    floorPlanLink {
      label
      href
      target
      iconName
    }
    floorPlanPdf {
      url
    }
    shareVillaButtonText
    consultant
    villaCost
    currency
    sys {
      id
    }
  }
}
`;

export function getVillasBySizeAndBedroomsQuery(
  limit: number,
  type: string,
  bedrooms: string,
  sizeMin: string,
  sizeMax: string,
  locale: string
) {
  const graphQlVillas = fetchGraphQL(
    `query {
        villaCollection(
            locale: "${locale}"
            limit: ${limit}
            where: {
              category: "${type}",
              AND: [
                { specifications: { fieldName: "bedrooms", numberValue: ${bedrooms} } }
                {
                  specifications: {
                    fieldName: "size"
                    numberValue_gte: ${sizeMin}
                    numberValue_lte: ${sizeMax ? sizeMax : 9999}
                  }
                }
              ]
            }
        ) ${villaAllDetailsQuery}
      }`
  );

  return graphQlVillas;
}

export function getVillasBySizeQuery(
  limit: number,
  type: string,
  sizeMin: string,
  sizeMax: string,
  locale: string
) {
  const graphQlVillas = fetchGraphQL(
    `query {
        villaCollection(
            locale: "${locale}"
            limit: ${limit}
            where: {
            category: "${type}"
            AND: 
              [
                {
                  specifications: {
                    fieldName: "size"
                    numberValue_gte: ${sizeMin}
                    numberValue_lte: ${sizeMax ? sizeMax : 9999}
                  }
                }
              ] 
            }
          ) ${villaAllDetailsQuery}
        }`
  );

  return graphQlVillas;
}

export async function getVillasByFilterQueries(
  locale = 'ar',
  limit = 10,
  query: any,
  page: number
) {
  const stringifiedQueryObject = JSON.stringify(query);
  // Remove quotes from property keys
  const unquotedStringifiedQueryObject = stringifiedQueryObject.replace(
    /"([^"]+)":/g,
    '$1:'
  );
  const graphQlVillas = fetchGraphQL(
    `query {
        villaCollection(
            locale: "${locale}" 
            limit: ${limit}
            skip: ${page * limit} 
            where: ${unquotedStringifiedQueryObject}
            order: id_ASC
        ) 
         ${villaAllDetailsQuery}
        }`
  );

  return graphQlVillas;
}

export async function getVillaIds() {
  const response = await fetchGraphQL(
    `query {
      villaCollection(locale: "en", order: sys_firstPublishedAt_ASC) {
        items {
          sys {
            id
          }
        }
      }
    }`
  );
  return response?.data?.villaCollection?.items;
}
