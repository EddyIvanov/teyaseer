import {
  AssetType,
  RichTextType,
  CategoryType,
  LinkType,
  Filters,
} from '@/types/ContentFul.type';

export interface VillaType {
  sys: {
    id: string;
  };
  fields: {
    description: RichTextType;
    images: AssetType[];
    specifications: CategoryType[];
    title: string;
    isFeatured: boolean;
    shortDescription: RichTextType;
    learnMore: LinkType;
    floorPlanLink: LinkType;
    floorPlanPdf: AssetType;
    shareVillaButtonText: string;
    consultant: string;
    villaCost: string;
    category: string;
    currency: string;
    id: string;
  };
}

export interface VillaDesignType {
  fields: {
    contentType: string;
    cta: LinkType;
    subtitle: string;
    title: string;
    villas: VillaType[];
    backNavigation: LinkType;
    filters: Filters[];
  };
}

export interface VillaDesignsSectionProps {
  contentType: string;
  villaDesignTypes: VillaDesignType[];
  id?: string;
}
