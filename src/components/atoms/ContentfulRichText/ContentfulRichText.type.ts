import { PropsWithChildren } from 'react';

import { Document } from '@contentful/rich-text-types';

import { HyperlinkType } from '@/types/ContentFul.type';

type RenderNodeFunction = (
  node: any,
  children: React.ReactNode
) => React.ReactNode;

interface ContentfulRichTextProps extends PropsWithChildren {
  document: Document;
  className?: string;
  linkAsButton?: boolean;
  getParagraphNode?: RenderNodeFunction;
  getHeaderNode?: RenderNodeFunction;
  getHyperlinkNode?: RenderNodeFunction;
  dynamicContent?: boolean;
  variant?: 'dynamicContent' | 'unstyled' | 'accordion';
  hyperlinkType?: HyperlinkType;
}

export default ContentfulRichTextProps;
