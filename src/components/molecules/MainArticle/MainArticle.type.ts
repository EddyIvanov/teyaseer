import { PropsWithChildren, ReactElement } from 'react';

import { SystemStyleObject } from '@chakra-ui/react';

import {
  AssetType,
  DisplayLinkAsType,
  RichTextType,
} from '@/types/ContentFul.type';

export interface MainArticleProps extends PropsWithChildren {
  backgroundImg?: AssetType;
  title?: RichTextType;
  titlePosition?: TitlePosition;
  subtitle?: ReactElement;
  description?: RichTextType;
  descriptionPosition?: DescriptionPosition;
  size?: Size;
  variant?: Variant;
  style?: Record<string, SystemStyleObject>;
  displayLinkAs?: DisplayLinkAsType;
  height?: number;
  panelWidth?: number | string;
  hasAnimation?: boolean;
  LogoComponent?: ReactElement;
  id?: string;
  isPageFirstSection?: boolean;
  lazy?: 'lazy' | 'eager' | undefined;
  isLoading?: boolean;
}

export type TitlePosition = 'Bottom' | 'Center';

export type DescriptionPosition = 'Bottom' | 'Top' | 'Center';

export type Size = 'fullScreen' | 'fixedHeight';

export type Variant = 'normalImage' | 'swapImage';
