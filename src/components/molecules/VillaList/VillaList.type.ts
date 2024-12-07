import {
  VillaDesignType,
  VillaType,
} from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';

export interface VillaListProps {
  id: string;
  villaDesign: VillaDesignType;
  initialVillas: VillaType[];
  villaCategory?: string;
  isInsideCustomerPortal?: boolean;
  headerTitle: string;
}
