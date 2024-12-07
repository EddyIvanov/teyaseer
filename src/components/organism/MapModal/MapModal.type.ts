export type AddressList = {
  addressList: {
    fields: Address;
  }[];
};

export type Address = {
  latitude: number;
  longitude: number;
  details: string;
  markerType?: 'primary' | 'secondary';
  openHours: string;
  phoneNumber?: string;
  email?: string;
};

export type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
