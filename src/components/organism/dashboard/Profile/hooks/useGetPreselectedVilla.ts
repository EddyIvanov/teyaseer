import { useContext, useEffect, useState } from 'react';

import { useCalculator } from 'teyaseer-calculator-engine';

import { T_ParseVillaDetails } from '@/components/organism/dashboard/Profile/Profile.type';
import { generateSelectedVillaOptions } from '@/components/organism/dashboard/Profile/generateSelectedVillaOptions';
import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { getVillaById } from '@/services/villas';

const parseVillaRes = (villaData: VillaType): T_ParseVillaDetails | null => {
  if (!villaData) return null;
  const { fields } = villaData;

  return {
    villaStyle: fields.category,
    villaTitle: fields.title,
    villaSize: fields.specifications.find(
      spec => spec.fields.fieldName === 'size'
    )?.fields.title,
    imgSrc: fields.images[0].fields.file.url,
  };
};

export function useGetPreselectedVilla() {
  const { locale } = useContext(Context);
  const {
    calculateSummery,
    status,
    selectedVillaSpaces,
    images: savedCalcImages,
    data,
    setCalculatorId,
    getCalculatorById,
  } = useCalculator();

  const { user, userLoading } = useContext(DashboardContext);

  const { latestCalculatorInstance } = user || {};

  const { id: savedCalculatorId } = latestCalculatorInstance || {};

  const preDesignedId = user?.userInfo.plotInfo.preDesignedVillaId;

  const [villa, setVilla] = useState<T_ParseVillaDetails | null>();
  const [loading, setLoading] = useState(false);

  const getVillaByIdAndLocale = async (id: string) => {
    try {
      setLoading(true);
      const villa: VillaType = await getVillaById(id, locale);

      const parsedVilla = parseVillaRes(villa);
      if (villa)
        setVilla({
          ...parsedVilla,
          detailsPath: `/dashboard/services/select-villa/${villa.sys.id}`,
        });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setVilla(null);
    }
  };

  useEffect(() => {
    if (!savedCalculatorId) return;
    setCalculatorId(savedCalculatorId);
    getCalculatorById(savedCalculatorId);
  }, [savedCalculatorId]);

  useEffect(() => {
    if (
      savedCalculatorId &&
      !status.isDataLoading &&
      !status.loadStatus.isLoading
    ) {
      calculateSummery();
    }
  }, [status.isDataLoading, status.loadStatus.isLoading, savedCalculatorId]);

  useEffect(() => {
    if (!savedCalculatorId) return;
    const selectedCalcValues = generateSelectedVillaOptions(data);
    if (!selectedCalcValues) return;

    setVilla({
      ...(selectedCalcValues && {
        villaStyle: selectedCalcValues['villa style'],
        bedrooms: selectedCalcValues.bedrooms,
        bathrooms: selectedCalcValues.bathrooms,
        imgSrc: savedCalcImages.villaRequirements,
      }),
      villaSize: selectedVillaSpaces.builtUpArea.toString(),
      detailsPath: `/dashboard/services/villa-configurator/summary?id=${savedCalculatorId}`,
    });
  }, [
    data,
    selectedVillaSpaces.builtUpArea,
    savedCalcImages.villaRequirements,
    savedCalculatorId,
  ]);

  // fetch pre-designed villa
  useEffect(() => {
    if (preDesignedId) getVillaByIdAndLocale(preDesignedId);
  }, [preDesignedId, selectedVillaSpaces.builtUpArea]);

  return {
    loading: loading || userLoading,
    villa,
    getVillaByIdAndLocale,
  };
}
