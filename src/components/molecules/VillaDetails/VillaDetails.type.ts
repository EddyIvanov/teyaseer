import { VillaType } from '../../renderings/VillaDesignsSection/VillaDesignsSection.type';

interface VillaDetailsProps {
  isMobile: boolean | undefined;
  villaDetails: VillaType;
  isInsideCustomerPortal?: boolean;
}

export default VillaDetailsProps;
