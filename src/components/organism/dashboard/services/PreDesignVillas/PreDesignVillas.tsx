import PreDesignVillasProps from './PreDesignVillas.type';

import { VillaList } from '@/components';

const PreDesignVillas = ({
  initialVillas,
  preDesignVilla,
}: PreDesignVillasProps) => {
  return (
    <VillaList
      id={preDesignVilla.fields.contentType}
      villaDesign={preDesignVilla!}
      initialVillas={initialVillas}
      headerTitle={preDesignVilla!.fields.subtitle}
      isInsideCustomerPortal
    />
  );
};

export default PreDesignVillas;
