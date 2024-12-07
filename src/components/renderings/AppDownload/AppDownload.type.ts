import { Document } from '@contentful/rich-text-types';

import { AssetType, LinkType } from '@/types/ContentFul.type';

export interface AppDownloadProps {
  mainTitle: Document;
  description: Document;
  contentType: string;
  backgroundImage: AssetType;
  id?: string;
  dropdownLists?: LinkType[];
}
