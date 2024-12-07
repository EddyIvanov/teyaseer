import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';

export interface VillaDesignRecommendationsProps {
  villaType: string;
  villaBedrooms: string;
  villaSize: string;
  isDashboard?: boolean;
}

export interface VillaDesignResponse {
  villas: VillaType[];
  isShowingFeaturedVillas: boolean;
  isShowingOnlySizeMatchedVillas: boolean;
  sizeFilterObj: {
    sizeMin: string;
    sizeMax: string;
    isSizeFilterFound: boolean;
  };
}
