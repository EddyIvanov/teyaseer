import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import {
  getVillasBySizeAndBedroomsQuery,
  getVillasBySizeQuery,
} from '@/graphql/api';
import {
  getVillasFromGraphQLResponse,
  getVillasFromSDKResponse,
} from '@/helpers/villas';
import Client from '@/lib/contentFul';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const getFeaturedVillas = async (type: string, locale: string) => {
  if (!type) {
    return [];
  }

  const featuredVillas = await Client.getEntries({
    content_type: 'villa',
    'fields.isFeatured': 'true',
    'fields.category': type,
    locale: locale,
    include: 4,
  });

  return featuredVillas.items;
};

export const getVillaDesignSizeFilter = async (
  category: string,
  size: string
) => {
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const villaDesignCategory = `${capitalizedCategory}VillaDesign`;

  const villaDesignData: ContentTypeResponseType = await Client.getEntries({
    content_type: 'villaDesign',
    'fields.contentType': villaDesignCategory,
    include: 4,
  });

  const sizeFilter = villaDesignData.items[0]?.fields.filters.find(
    (filter: any) => filter.fields.fieldName === 'size'
  );

  const selectedSizeFilter = sizeFilter?.fields.filters.find((filter: any) => {
    const greaterThanMin = filter.fields.min <= parseInt(size);
    const lessThanMax = filter.fields.max
      ? filter.fields.max > parseInt(size)
      : true;

    return greaterThanMin && lessThanMax;
  });

  if (selectedSizeFilter) {
    return {
      sizeFilterFound: true,
      selectedSizeFilter: selectedSizeFilter,
    };
  } else {
    return {
      sizeFilterFound: false,
      selectedSizeFilter: sizeFilter?.fields.filters[0],
    };
  }
};

const getSizeMinMaxFromSizeFilter = async (type: string, size: string) => {
  let sizeMin = '0';
  let sizeMax = '0';

  const sizeFilterObj = await getVillaDesignSizeFilter(type, size);

  if (sizeFilterObj.sizeFilterFound) {
    sizeMin = sizeFilterObj.selectedSizeFilter?.fields.min.toString();
    // If max is not defined, set it to empty string, applicable for the last filter
    sizeMax = sizeFilterObj.selectedSizeFilter?.fields.max
      ? sizeFilterObj.selectedSizeFilter?.fields.max.toString()
      : '';
  } else {
    sizeMin = '0';
    sizeMax = sizeFilterObj.selectedSizeFilter?.fields.min.toString();
  }

  return {
    sizeMin,
    sizeMax,
    isSizeFilterFound: sizeFilterObj.sizeFilterFound,
  };
};

const getVillasFromContentful = async (
  type: string,
  bedrooms: string,
  sizeFilterObj: {
    sizeMin: string;
    sizeMax: string;
  },
  locale: string
) => {
  let recommendedVillas: any[] = [];
  let sizeOnlyVillas: any[] = [];
  let featuredVillas: VillaType[] = [];

  const recommendedVillasQuery = getVillasBySizeAndBedroomsQuery(
    2,
    type,
    bedrooms,
    sizeFilterObj.sizeMin,
    sizeFilterObj.sizeMax,
    locale
  );

  const sizeOnlyVillasQuery = getVillasBySizeQuery(
    2,
    type,
    sizeFilterObj.sizeMin,
    sizeFilterObj.sizeMax,
    locale
  );

  const [
    recommendedVillasResponse,
    sizeOnlyVillasResponse,
    featuredVillasResponse,
  ] = await Promise.allSettled([
    recommendedVillasQuery,
    sizeOnlyVillasQuery,
    getFeaturedVillas(type, locale),
  ]);

  recommendedVillas = getVillasFromGraphQLResponse(recommendedVillasResponse);

  sizeOnlyVillas = getVillasFromGraphQLResponse(sizeOnlyVillasResponse);

  featuredVillas = getVillasFromSDKResponse(featuredVillasResponse);

  return {
    recommendedVillas,
    sizeOnlyVillas,
    featuredVillas,
  };
};

export const getVillaDesignRecommendations: any = async (
  type: string,
  bedrooms: string,
  size: string,
  locale: string
) => {
  let villasToDisplay: VillaType[] = [];
  let isShowingFeaturedVillas = false;
  let isShowingOnlySizeMatchedVillas = false;

  const sizeFilterObj = await getSizeMinMaxFromSizeFilter(type, size);

  const { recommendedVillas, sizeOnlyVillas, featuredVillas } =
    await getVillasFromContentful(type, bedrooms, sizeFilterObj, locale);

  if (recommendedVillas.length > 0) {
    villasToDisplay = [...recommendedVillas];
  } else if (sizeOnlyVillas.length > 0) {
    villasToDisplay = [...sizeOnlyVillas];
    isShowingOnlySizeMatchedVillas = true;
  } else if (featuredVillas.length > 0) {
    villasToDisplay = [...featuredVillas];
    isShowingFeaturedVillas = true;
  }

  return {
    villas: villasToDisplay.slice(0, 2),
    isShowingFeaturedVillas,
    isShowingOnlySizeMatchedVillas,
    sizeFilterObj,
  };
};
