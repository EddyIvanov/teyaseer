import { LinkType } from '@/types/ContentFul.type';

interface VendorsListSectionProps {
  filtersFieldsMapping: Record<string, string>;
  title: string;
  extraInfo: {
    fields: {
      subtitle: string;
      link: LinkType;
    };
  };
}

export default VendorsListSectionProps;
