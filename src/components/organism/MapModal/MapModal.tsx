import { useContext, useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { getMapData } from './MapModal.apis';
import style from './MapModal.style';
import { Address, AddressList, MapModalProps } from './MapModal.type';
import MapInfoBox from './components/MapInfoBox';

import { Loader, Modal } from '@/components';
import Map, { MapDefaults, useMapContext } from '@/components/molecules/Map';
import { Context } from '@/providers/MainContext';

const MapModal = ({ isOpen, onClose }: MapModalProps) => {
  const { locale } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<Address[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getMapData(locale).then((res: AddressList | undefined) => {
        if (res) {
          const address = res.addressList?.map(item => item.fields);
          setAddress(address);
        }
        setIsLoading(false);
      });
    }
  }, [isOpen]);

  const ConfigureMap = () => {
    const { setMarkers } = useMapContext();

    useEffect(() => {
      setMarkers(address);
    }, [address]);

    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box sx={style.map}>
        {isLoading ? (
          <Flex className="loader">
            <Loader />
          </Flex>
        ) : (
          <Map<Address>
            center={{
              lat: MapDefaults.CENTER_LAT,
              lng: MapDefaults.CENTER_LNG,
            }}
            zoom={MapDefaults.ZOOM_DESKTOP}
            renderChildrenOutTheMap={<ConfigureMap />}
            renderInfoBox={(address: Address) => <MapInfoBox {...address} />}
          />
        )}
      </Box>
    </Modal>
  );
};

export default MapModal;
