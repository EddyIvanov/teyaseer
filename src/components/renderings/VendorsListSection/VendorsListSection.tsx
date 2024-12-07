import { useState, useEffect } from 'react';

import { getFilters } from './VendorsListSection.api';
import VendorsListSectionProps from './VendorsListSection.type';

import OurPartners from '@/components/organism/OurPartners';

const VendorsListSection = (props: VendorsListSectionProps) => {
  const [filters, setFilters] = useState({});

  const signupInfo = {
    text: props.extraInfo.fields.subtitle,
    link: props.extraInfo.fields.link,
  };

  const getVendorFilters = async () => {
    const vendorFilters = await getFilters(props.filtersFieldsMapping);
    setFilters(vendorFilters);
  };

  useEffect(() => {
    getVendorFilters();
  }, []);

  return (
    <OurPartners
      filters={filters}
      title={props.title}
      signupInfo={signupInfo}
    />
  );
};

export default VendorsListSection;
