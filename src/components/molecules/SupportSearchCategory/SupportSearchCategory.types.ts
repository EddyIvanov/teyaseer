import { EntrySys } from 'contentful';

import { IconNames } from '@/components/atoms/Icon/Icon';
import { RichTextType } from '@/types/ContentFul.type';

export interface SupportCategory {
  sys: EntrySys;
  title: string;
  contentCollection: {
    items: ArticleContent[];
  };
}

interface ArticleContent {
  sys: EntrySys;
  title: string;
  content: {
    json: RichTextType;
  };
}

export interface EmptySupportSearch {
  description: {
    json: RichTextType;
  };
  iconName?: IconNames;
}
