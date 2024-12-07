import { PropsWithChildren } from 'react';

export interface OnboardingMapArticleProps extends PropsWithChildren {
  plotLatitude?: number | null;
  plotLongitude?: number | null;
  backButtonNode?: React.ReactNode;
}
