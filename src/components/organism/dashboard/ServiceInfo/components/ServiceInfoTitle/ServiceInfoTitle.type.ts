import { PropsWithChildren } from 'react';

export interface IServiceInfoTitleProps extends PropsWithChildren {
  title?: string;
  defaultCollapsed?: boolean;
}
