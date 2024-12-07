import { PropsWithChildren } from 'react';

import { AssetType, LinkType } from '@/types/ContentFul.type';

export interface HeaderDataType {
  logoBlack: AssetType;
  primaryNav: LinkType[];
}

export interface IDashboardLayout extends PropsWithChildren {
  hasBackToServices?: boolean;
  backToServicesButton?: React.ReactNode;
}
