import { TitlePosition } from '@/components/molecules/MainArticle';
import {
  AssetType,
  baseResponseType,
  DisplayLinkAsType,
  RichTextType,
} from '@/types/ContentFul.type';

export type NonEligibleArticleSectionProps = baseResponseType & {
  mainTitle: RichTextType;
  mainTitlePosition: TitlePosition;
  description: RichTextType;
  backgroundImage: AssetType;
  contentType: string;
  fullScreen: boolean;
  swapImagePosition: boolean;
  displayLinkAs: DisplayLinkAsType;
  smallLogo: AssetType;
  id?: string;
};
