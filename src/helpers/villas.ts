import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';

export const normalizeVillas = (graphQlvillas: any): VillaType[] => {
  const normalizedVillas = graphQlvillas?.map((villa: any) => {
    return {
      sys: {
        id: villa.sys.id,
      },
      fields: {
        title: villa.title,
        description: villa.description.json,
        images: villa.imagesCollection.items.map((image: any) => ({
          fields: {
            title: image.title,
            description: image.description,
            file: {
              url: image.url,
            },
          },
          sys: {
            ...image.sys,
          },
        })),
        specifications: villa.specificationsCollection.items.map(
          (spec: any) => ({
            fields: {
              ...spec,
            },
          })
        ),
        isFeatured: villa.isFeatured,
        shortDescription: villa.shortDescription.json,
        learnMore: {
          fields: {
            ...villa.learnMore,
          },
        },
        floorPlanLink: villa.floorPlanLink
          ? {
              fields: {
                ...villa.floorPlanLink,
              },
            }
          : null,
        floorPlanPdf: villa.floorPlanPdf
          ? {
              fields: {
                file: {
                  url: villa.floorPlanPdf.url,
                },
              },
            }
          : null,
        shareVillaButtonText: villa.shareVillaButtonText,
        consultant: villa.consultant,
        villaCost: villa.villaCost,
        category: villa.category,
        currency: villa.currency,
      },
    };
  });

  return normalizedVillas;
};

export const getVillasFromGraphQLResponse = (graphQLResponse: any) => {
  let villas: any[] = [];

  if (graphQLResponse.status === 'fulfilled') {
    if (graphQLResponse.value?.data) {
      villas = normalizeVillas([
        ...graphQLResponse.value.data.villaCollection.items,
      ]);
    } else {
      villas = [];
    }
  }

  return villas;
};

export const getVillasFromSDKResponse = (sdkResponse: any) => {
  let villas: VillaType[] = [];

  if (sdkResponse.status === 'fulfilled') {
    if (sdkResponse.value) {
      villas = [...sdkResponse.value];
    } else {
      villas = [];
    }
  }

  return villas;
};
