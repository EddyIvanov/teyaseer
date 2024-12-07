import ArticleLinkProps from '@/components/molecules/ArticleLink/ArticleLink.type';
import { AssetType } from '@/types/ContentFul.type';

export interface ArticleListectionProps {
  title?: string;
  contentType: string;
  image?: AssetType;
  listOfLinks?: { fields: ArticleLinkProps }[];
  id?: string;
}
