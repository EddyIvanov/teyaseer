import { VillaType } from '../../renderings/VillaDesignsSection/VillaDesignsSection.type';

export interface VillaArticleBigProps {
  isScreenSizeMdOrBelow: boolean | undefined;
  villa: VillaType;
  isMirrored?: boolean;
  isInsideCustomerPortal?: boolean;
}
