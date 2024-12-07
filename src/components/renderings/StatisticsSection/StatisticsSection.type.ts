import {
  InfoBoxListType,
  AssetType,
  LinkType,
  RichTextType,
} from '@/types/ContentFul.type';

export interface StatisticsSectionProps {
  title?: RichTextType;
  contentType: string;
  infoBoxList?: InfoBoxListType[];
  backgroundImage?: AssetType;
  actionLinks?: LinkType[];
  textColor: 'light' | 'dark';
  id?: string;
}
