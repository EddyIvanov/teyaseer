import { IconNames } from '@/components/atoms/Icon/Icon';
import { AssetType, RichTextType } from '@/types/ContentFul.type';

export interface ArticleCategorySectionProps {
  title: string;
  categories: Category[];
  backgroundImage: AssetType;
  icon: AssetType;
  id?: string;
  mainTitle?: RichTextType;
  isPageFirstSection?: boolean;
}

export interface Category {
  sys: { id: string };
  fields: {
    title: string;
    icon: AssetType;
    content: Article[];
    iconName: IconNames;
  };
}

export interface Article {
  sys: { id: string };
  fields: {
    title: string;
    content: RichTextType;
  };
}
