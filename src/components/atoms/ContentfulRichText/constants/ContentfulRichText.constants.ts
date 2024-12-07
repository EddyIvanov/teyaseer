import { BLOCKS } from '@contentful/rich-text-types';

import { HyperlinkType } from '@/types/ContentFul.type';

export const HEADING_TYPES: any = {
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6',
};

export const BUTTON_VARIANTS: Record<HyperlinkType, string> = {
  Link: '',
  PrimaryButton: 'primary',
  SecondaryButton: 'secondary',
  SolidButton: 'solid',
};
