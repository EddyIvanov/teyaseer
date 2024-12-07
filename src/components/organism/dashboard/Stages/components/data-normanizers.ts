import {
  HeaderData,
  ServiceDescriptionArticle,
} from '@/components/organism/dashboard/Stages/Stage.type';
import {
  AssetType,
  ContentTypeResponseTypeWGen,
  HeaderDataRes,
  RichTextType,
} from '@/types/ContentFul.type';

export const normalizeHeaderDataObject = (
  input: ContentTypeResponseTypeWGen<HeaderDataRes>
): HeaderData | undefined => {
  const item = input.items?.[0];

  if (!item) return;

  const logo = item.fields?.logoBlack;

  return {
    logo,
  };
};

export const normalizeSRDataToObject = (
  input: ContentTypeResponseTypeWGen<{
    fields: {
      link: AssetType;
      content: {
        fields: {
          backgroundImage: AssetType;
          description: RichTextType;
          title: RichTextType;
          fullScreen: boolean;
          swapImagePosition: boolean;
        };
      };
    };
    sys: {
      id: string;
    };
  }>
): ServiceDescriptionArticle | undefined => {
  const item = input.items?.[0];

  if (!item) return;

  const fields = item.fields?.content?.fields;

  const backgroundImage = fields?.backgroundImage;

  const description = fields?.description;

  const mainTitle = fields?.title;

  const displayLinkAs = item.fields?.link?.fields?.label;

  const fullScreen = fields?.fullScreen;
  const swapImagePosition = fields?.swapImagePosition;
  const id = item.sys.id;

  return {
    backgroundImage,
    description,
    mainTitle,
    displayLinkAs,
    fullScreen,
    swapImagePosition,
    id,
  };
};
