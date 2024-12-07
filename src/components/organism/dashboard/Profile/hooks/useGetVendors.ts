import { useEffect, useState } from 'react';

import { getAwardedVendors } from '../Profile.api';
import { IAwardedVendors } from '../Profile.type';

const useGetVendors = () => {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<IAwardedVendors>();

  const getVendorsInfo = async () => {
    setLoading(true);
    try {
      const vendorsRes = await getAwardedVendors();
      setVendors(vendorsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendorsInfo();
  }, []);

  return {
    loading,
    vendors,
  };
};

export default useGetVendors;
