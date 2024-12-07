import React from 'react';

import { useRouter } from 'next/router';

import { VillaListSectionProps } from './VillaListSection.type';

import { VillaList } from '@/components';

const VillaListSection = ({ villaDesignTypes, id }: VillaListSectionProps) => {
  const router = useRouter();

  const villaCategory = router.query.id as string;
  return (
    <VillaList
      id={id!}
      villaDesign={villaDesignTypes!}
      villaCategory={villaCategory}
      initialVillas={villaDesignTypes!.fields.villas}
      headerTitle={villaDesignTypes!.fields.backNavigation.fields.label}
    />
  );
};

export default VillaListSection;
