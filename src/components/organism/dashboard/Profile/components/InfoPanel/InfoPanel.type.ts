import { PropsWithChildren } from 'react';

export interface InfoPanelProps extends PropsWithChildren {
  title: string;
  description: string;
}
