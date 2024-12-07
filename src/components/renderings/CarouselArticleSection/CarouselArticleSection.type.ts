import { Document } from '@contentful/rich-text-types';

import { AssetType, RichTextType } from '@/types/ContentFul.type';

export interface CarouselArticleSectionSlide {
  fields: {
    title?: string;
    contentType: string;
    backgroundImage?: AssetType;
    description: RichTextType;
    mainTitle: RichTextType;
  };
  sys: {
    id: string;
  };
}

export interface CarouselArticleSectionProps {
  contentType: string;
  title: Document;
  slides: CarouselArticleSectionSlide[];
  id?: string;
}
