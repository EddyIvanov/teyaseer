import { Document } from '@contentful/rich-text-types';

import { IconNames } from '@/components/atoms/Icon/Icon';
import { AssetType } from '@/types/ContentFul.type';

interface TimelineStage {
  fields: {
    background: AssetType;
    title: string;
    subtitle: string;
    stepTitle: string;
    stepSubtitle: string;
    stepIcon: IconNames;
    description: Document;
  };
}
interface TimelineProps {
  title: string;
  contentType: string;
  stages: TimelineStage[];
  isActive: boolean;
  id?: string;
}
interface SliderItemProps {
  stage: TimelineStage;
  index: number;
}

export type { TimelineProps, SliderItemProps, TimelineStage };
