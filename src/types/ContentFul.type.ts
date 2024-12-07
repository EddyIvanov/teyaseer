import { Document } from '@contentful/rich-text-types';

import { IconNames } from '@/components/atoms/Icon/Icon';

export interface ContentTypeResponseType {
  includes?: any;
  items: any[];
  limit?: number;
  skip?: number;
  sys?: any;
  total: number;
}

export interface ContentTypeResponseTypeWGen<T> {
  items: T[];
  total: number;
  skip?: number;
  limit?: number;
  includes?: any;
}
export interface baseResponseType {
  metadata: {
    tags: [];
  };
  sys: {
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    revision: number;
    contentType: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    locale: string;
  };
}

export interface HeaderDataRes extends baseResponseType {
  fields: {
    logoBlack: AssetType;
  };
}

export interface AssetType {
  fields: {
    title: string;
    description: string;
    label: DisplayLinkAsType;
    file: {
      url: string;
      fileName: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      contentType: string;
    };
  };
  sys: {
    id: string;
  };
}
export interface LinkType extends baseResponseType {
  fields: {
    label: string;
    href: string;
    target: string;
    icon?: AssetType;
    iconName?: IconNames;
    metaInfo?: string;
  };
}
export interface ImageLinkType {
  fields: {
    label: string;
    href: string;
    target: string;
    image: AssetType;
  };
}

export interface InfoBoxListType extends baseResponseType {
  fields: {
    title?: string;
    subtitle?: string;
    iconName?: IconNames;
  };
}

export interface RenderingFieldsType {
  fields?: any;
  contentType: string;
  slug?: string;
}

export interface RenderingsType extends baseResponseType {
  fields: RenderingFieldsType | any;
}

export interface HeaderDataType {
  logoBlack: AssetType;
  languages: any;
  primaryNav: any;
  secondaryNav: any;
  socialLinks?: {
    fields: {
      links: LinkType[];
    };
  };
}

export interface FooterDataType {
  copyRight: string;
  logos: LinkType[];
  navs: LinkType[];
  socialLinks?: {
    fields: {
      links: LinkType[];
    };
  };
}

export interface WebPage {
  title?: string;
  slug?: string;
  metaDescription: string;
  metaTitle: string;
  metaImage: AssetType;
  renderings: RenderingsType[];
  error: any;
  whiteHeader?: boolean;
  fixFooter?: boolean;
}

export type PageProps = WebPage & {
  headerData: HeaderDataType;
  footerData: FooterDataType;
  rawData?: ContentTypeResponseType;
};

export interface RichTextType extends Document {}

export interface CategoryType {
  sys: {
    id: string;
  };
  fields: {
    icon: AssetType;
    title: string;
    iconName: IconNames;
    showInList: boolean;
    value: string;
    numberValue: number;
    fieldName: string;
  };
}

export interface OnboardingOption extends baseResponseType {
  fields: {
    text: string;
    nextQuestionId: baseResponseType;
  };
}

export interface OnboardingQuestions extends baseResponseType {
  fields: {
    backgroundImage: AssetType;
    questionOptions?: OnboardingOption[];
    questionText: Document;
    questionType: string;
    title: Document;
    redirectLink?: LinkType;
  };
}

export type HyperlinkType =
  | 'Link'
  | 'PrimaryButton'
  | 'SecondaryButton'
  | 'SolidButton';

export type DisplayLinkAsType = {
  fields: {
    type: HyperlinkType;
  };
};

export type Filter = {
  sys: {
    id: string;
  };
  fields: {
    label: string;
    value: number;
    min: number;
    max: number;
    stringValue: string;
  };
};

export interface Filters {
  sys: {
    id: string;
  };
  fields: {
    displayName: string;
    fieldName: string;
    type: string;
    filters: Filter[];
  };
}

interface TextElement {
  nodeType: 'text';
  value: string;
  marks: any[];
  data: Record<string, unknown>;
}

interface ContentElement {
  nodeType: string;
  data: Record<string, unknown>;
  content: TextElement[];
}

interface Content {
  nodeType: string;
  data: Record<string, unknown>;
  content: ContentElement[];
}

export type GuideItem = {
  fields: { title: string; content: Document };
  sys: { id: string };
};

export interface GuideItemFields {
  title: string;
  content: Content;
  guideItems: Array<GuideItem>;
}

export interface GuideIResponse extends baseResponseType {
  fields: Array<GuideItemFields>;
}
