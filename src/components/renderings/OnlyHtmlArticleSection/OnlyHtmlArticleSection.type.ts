import { AssetType, RichTextType } from '@/types/ContentFul.type';

export interface ArticleSectionProps {
  title?: string;
  contentType: string;
  backgroundImage?: AssetType;
  description: RichTextType;
  mainTitle: RichTextType;
  showLinksAsButtons: boolean;
  id?: string;
}
