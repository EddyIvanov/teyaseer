import { LinkType } from '@/types/ContentFul.type';

interface OurPartnersProps {
  title: string;
  filters: Record<
    string,
    {
      labelTextContentfulId: string;
      fieldName: string;
      data: {
        name: string;
      }[];
    }
  >;
  signupInfo: {
    text: string;
    link: LinkType;
  };
}

export default OurPartnersProps;
