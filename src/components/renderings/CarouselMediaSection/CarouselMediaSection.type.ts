import { AssetType, RichTextType } from '@/types/ContentFul.type';

export interface CarouselMediaSectionSlide {
  fields: {
    title: RichTextType;
    mediaItem: AssetType;
    description: string;
    poster: AssetType;
  };
  sys: {
    id: string;
  };
}

export interface CarouselMediaSectionProps {
  contentType: string;
  title: RichTextType;
  slides: CarouselMediaSectionSlide[];
  id?: string;
  poster: AssetType;
}
