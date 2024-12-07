import { AssetType, LinkType } from '@/types/ContentFul.type';

interface ArticleLinkProps {
  title: React.ReactNode;
  description: React.ReactNode;
  button: LinkType;
  contentType: string;
  articlePdf?: AssetType;
}

export default ArticleLinkProps;
