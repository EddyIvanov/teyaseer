import { AssetType, RichTextType } from '@/types/ContentFul.type';

export interface TeyaseerArticleSectionProps {
  title?: string;
  description: RichTextType;
  contentType: string;
  backgroundImage: AssetType;
  mainTitle: RichTextType;
  id?: string;
}
