import {
  RichTextType,
  CategoryType,
  LinkType,
  AssetType,
} from '@/types/ContentFul.type';

export interface VillaShortDetailsProps {
  title: string;
  description: RichTextType;
  specifications: CategoryType[];
  learnMore: LinkType;
  id: string;
  floorPlanLink: LinkType;
  floorPlanPdf: AssetType;
  isMirrored?: boolean;
  isInsideCustomerPortal?: boolean;
}
