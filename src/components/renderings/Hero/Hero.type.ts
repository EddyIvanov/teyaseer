import {
  AssetType,
  DisplayLinkAsType,
  LinkType,
  RichTextType,
} from '@/types/ContentFul.type';

export interface HeroPageProps {
  title: RichTextType;
  contentType: string;
  background: AssetType;
  logo?: AssetType;
  secondaryLogo?: AssetType;
  authLink?: LinkType;
  displayLinkAs?: DisplayLinkAsType;
  id?: string;
}
export default HeroPageProps;
