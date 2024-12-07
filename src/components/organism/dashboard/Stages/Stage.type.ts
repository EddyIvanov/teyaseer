import { Document } from '@contentful/rich-text-types';

import { ServiceData } from './components/Service/Service.type';

import { IconNames } from '@/components/atoms/Icon/Icon';
import {
  AssetType,
  DisplayLinkAsType,
  RichTextType,
} from '@/types/ContentFul.type';

export type StageStatusMappingType = Record<
  string,
  {
    isCompleteStage: boolean;
    isCurrentStage: boolean;
  }
>;

export type StageDataResponse = {
  isSalesforceDataAvailable: boolean;
  sfServiceCollection: {
    items: StageData[];
    total: number;
  };
};

export type StageData = {
  description: string;
  icon: IconNames;
  iconText: string;
  image: {
    url: string;
  };
  isCompleteStage: boolean | null;
  isCurrentStage: boolean;
  name: string;
  optionsCollection?: {
    items: ServiceData[];
    total: number;
  };
  sfStageName: string;
  slug: string;
  stageOrder: number;
  title: string;
  infoDescription: string | null;
  infoThumbnail: AssetType | null;
  homescreenContent: {
    fields: {
      backgroundImage?: AssetType;
      description?: Document;
      displayLinkAs?: DisplayLinkAsType;
    };
  };
};

export type HeaderData = {
  logo: AssetType;
};

export type ServiceDescriptionArticle = {
  mainTitle?: RichTextType;
  description?: RichTextType;
  backgroundImage?: AssetType;
  fullScreen?: boolean;
  swapImagePosition?: boolean;
  displayLinkAs?: DisplayLinkAsType;
  id?: string;
  isPageFirstSection?: boolean;
};
