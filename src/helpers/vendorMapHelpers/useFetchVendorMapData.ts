import { useEffect, useState } from 'react';

import { parseDistrictsToPolygons } from './parseVendorMapData';

import { MapDefaults } from '@/components/molecules/Map';
import { TGeoJsonFeatureItem } from '@/components/molecules/Map/types/MapPolygon';
import { fetchDistricts, fetchMunicipalities } from '@/services/vendors';

export function useFetchVendorMapData() {
  const [isMunicipalitiesLoading, setIsMunicipalitiesLoading] = useState(false);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState(false);
  const [municipalityError, setMunicipalityError] = useState(null);
  const [districtError, setDistrictError] = useState(null);

  const [municipalityCenter, setMunicipalityCenter] = useState({
    lat: MapDefaults.VENDOR_MAP_CENTER_LAT,
    lng: MapDefaults.VENDOR_MAP_CENTER_LNG,
  });

  const [municipalities, setMunicipalities] = useState<
    { [key: string]: TGeoJsonFeatureItem } | undefined
  >();
  const [districts, setDistricts] = useState<
    { [key: string]: TGeoJsonFeatureItem } | undefined
  >();

  useEffect(() => {
    setIsMunicipalitiesLoading(true);
    fetchMunicipalities()
      .then(municipalitiesResult => {
        const { boundingBoxCenter, data } = parseDistrictsToPolygons(
          municipalitiesResult.data,
          true
        );

        if (boundingBoxCenter) setMunicipalityCenter(boundingBoxCenter);
        setMunicipalities(data);
      })
      .catch(setMunicipalityError)
      .finally(() => setIsMunicipalitiesLoading(false));
  }, []);

  useEffect(() => {
    setIsDistrictsLoading(true);
    fetchDistricts()
      .then(districtsResult => {
        const { data } = parseDistrictsToPolygons(districtsResult.data);
        setDistricts(data);
      })
      .catch(setDistrictError)
      .finally(() => setIsDistrictsLoading(false));
  }, []);

  const error = municipalityError || districtError;

  const districtsCluster = {
    municipality: municipalities,
    district: districts,
  };

  return {
    municipalityCenter,
    districtsCluster,
    isMunicipalitiesLoading,
    isDistrictsLoading,
    error,
  };
}
